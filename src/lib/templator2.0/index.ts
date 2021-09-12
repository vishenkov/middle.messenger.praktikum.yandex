import get from '../get';
import sanitize from '../sanitize';

export default class Templator {
  constructor(template, components) {
    this.__template = template;
    this.__components = components;
    this.__tags = [];
  }

  compile(ctx) {
    return this.__compileTemplate(this.__template, ctx);
  }

  __addOpeningTag(tag) {
    this.__tags.push(tag);
  }

  __closeTag(tag) {
    if (this.__tags.length === 0) {
      throw new Error(`"${tag}" has no opening tag`);
    }

    const lastTag = this.__tags[this.__tags.length - 1];

    if (tag !== lastTag) {
      throw new Error(`"${tag}" is not matched opening tag "${lastTag}""`);
    }

    this.__tags.pop();
  }

  __getRawValue(rawValue) {
    const lastCharIndex = rawValue.length - 1;
    if (rawValue[lastCharIndex] !== '"') {
      throw new Error(`Props value should have closing " at ${rawValue}`);
    }

    // removing ""
    const value = Array.prototype.slice.call(rawValue, 1, lastCharIndex).join('');

    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    const number = Number(value);
    if (!Number.isNaN(number)) {
      return number;
    }

    return value;
  }

  __parsePropsKeyValue({ key, value }) {
    if (!key) {
      return { key: null, value: null };
    }

    if (!value) {
      return { key: null, value: null };
    }

    const isString = value.startsWith('"');
    const hasCtxValue = (/\{\{(.*?)\}\}/gi).test(value);
    if (!hasCtxValue && !isString) {
      throw new Error(`Check props template for ${value}`!);
    }

    if (!hasCtxValue) {
      return { key, value: this.__getRawValue(value) };
    }

    return { key, value: (ctx) => this.__replaceContext(value, ctx) };
  }

  __parseProps(props) {
    if (!props) {
      return null;
    }

    const sanitizedProps = sanitize(props.trim());
    if (!sanitizedProps) {
      return null;
    }

    const propsPairsRegExp = /(?<key>\w+)=(?<value>{+[\w\s]+}+|"[{\w\s}]+")/gm;
    let match = null;
    const resultProps = {};

    // eslint-disable-next-line no-cond-assign
    while (match = propsPairsRegExp.exec(sanitizedProps)) {
      const { key, value } = this.__parsePropsKeyValue(match.groups);
      if (key) {
        resultProps[key] = value;
      }
    }

    return Object.keys(resultProps).length ? resultProps : null;
  }

  __replaceContext(value) {
    if (!value) {
      return value;
    }
    const hasCtxValue = (/\{\{(.*?)\}\}/gi).test(value);

    if (!hasCtxValue) {
      return value;
    }

    return (ctx) => {
      const tmpl = value;
      let key = null;
      let resultTmpl = tmpl;

      // Ищем {{ Значение }}
      const contextRegExp = /\{\{(.*?)\}\}/gi;
      // eslint-disable-next-line no-cond-assign
      while ((key = contextRegExp.exec(tmpl))) {
        if (key[1]) {
          const tmplValue = key[1].trim();

          const data = get(ctx, tmplValue);
          resultTmpl = resultTmpl.replace(new RegExp(key[0], 'gi'), data);
        }
      }

      return resultTmpl;
    };
  }

  __parseTextNode(template) {
    const childrenCtxRegExp = /{{children}}/gm;
    const match = childrenCtxRegExp.exec(template);
    console.log('match', match, template);
    if (!match) {
      return [{
        node: 'raw',
        props: null,
        children: [template],
      }, null];
    }

    const prevText = Array.prototype.slice.call(template, 0, match.index).join('');
    console.log('prevText', prevText);

    if (sanitize(prevText).trim()) {
      const restText = Array.prototype.slice.call(template, match.index).join('');
      console.log('restText', restText);
      return [{
        node: 'raw',
        props: null,
        children: [prevText],
      }, restText];
    }

    const childrenLength = '{{children}}'.length;
    const restText = Array.prototype.slice.call(template, match.index + childrenLength).join('');
    const sanitizedRestText = sanitize(restText).trim();

    return [{
      node: 'children',
      props: null,
      children: [],
    }, sanitizedRestText ? restText : null];
  }

  __getChildrenAST(template) {
    if (!template) {
      return [null, null];
    }

    const sanitizedTemplate = sanitize(template).trim();
    if (!sanitizedTemplate) {
      return [null, null];
    }

    const tagRegexp = /(?<fullTag><\/{0,1}(?<tag>\w+)(?<props>.*?)\/?>)(?<rest>[\s\S]{0,})$/gm;
    const match = tagRegexp.exec(template);
    if (!match) {
      return this.__parseTextNode(template);
    }

    if (match.index > 0) {
      const rawNode = template.slice(0, match.index);
      const isEmptyRawNode = sanitize(rawNode).trim().length === 0;
      const restTemplate = template.slice(match.index);

      if (isEmptyRawNode) {
        return this.__getChildrenAST(restTemplate);
      }

      const [textNodeAst, restTextNode] = this.__parseTextNode(rawNode);
      return [textNodeAst, restTextNode ? `${restTextNode}${restTemplate}` : restTemplate];
    }

    const {
      props, rest, tag, fullTag,
    } = match.groups;

    if (!fullTag) {
      throw new Error(`Check template for: ${rest}`);
    }

    const isClosingTag = fullTag.startsWith('</');
    const isSelfClosingTag = fullTag.endsWith('/>');

    if (isClosingTag) {
      this.__closeTag(tag);
      return [null, rest];
    }

    if (!isSelfClosingTag) {
      this.__addOpeningTag(tag);
    }

    const parsedProps = this.__parseProps(props);

    if (isSelfClosingTag) {
      return [{
        node: tag,
        props: parsedProps,
        children: [],
      }, rest];
    }

    const astNode = {
      node: tag,
      props: parsedProps,
      children: [],
    };

    const children = [];
    let [node, restTemplate] = this.__getChildrenAST(rest);
    while (node) {
      children.push(node);
      [node, restTemplate] = this.__getChildrenAST(restTemplate);
    }

    if (children.length > 0) {
      astNode.children = children;
    } else {
      astNode.children = [];
    }

    return [astNode, restTemplate];
  }

  __createAST(template) {
    const children = [];
    let node;
    let rest = template;

    while (rest) {
      [node, rest] = this.__getChildrenAST(rest);

      if (node) {
        children.push(node);
      }
    }

    return {
      node: 'root',
      props: null,
      children,
    };
  }

  __getNode(astNode, ctx) {
    if (astNode.node === 'raw') {
      if (astNode.children.length > 1) {
        throw new Error('Text node should have only one children');
      }

      const textValue = astNode.children[0];
      const text = typeof textValue === 'function'
        ? textValue(ctx)
        : textValue;

      return document.createTextNode(text);
    }

    return document.createElement(astNode.node);
  }

  __createComponent(astNode, ctx, children) {
    const Component = this.__components[astNode.node];
    if (!Component) {
      throw new Error(`Component ${astNode.node} is not provided!`);
    }

    const props = this.__replaceProps(astNode.props, ctx);
    console.log('__createComponent::props', astNode.props, props);
    const component = new Component({ ...props, children }, this.__components);

    return component.getContent();
  }

  __replaceProps(props, ctx) {
    if (!props) {
      return props;
    }

    return Object.keys(props).reduce((acc, prop) => {
      const propValue = props[prop];
      const value = typeof propValue === 'function'
        ? propValue(ctx)
        : propValue;

      return {
        ...acc,
        [prop]: value,
      };
    }, {});
  }

  __createDomElement(astNode, ctx) {
    if (astNode.node === 'children') {
      return ctx.children;
    }

    if (astNode.node === 'raw') {
      return this.__getNode(astNode, ctx);
    }

    const childrenElements = [];
    if (astNode.children.length > 0) {
      astNode.children.forEach((childNode) => {
        const childElement = this.__createDomElement(childNode, ctx);
        if (Array.isArray(childElement)) {
          childrenElements.push(...childElement);
        } else {
          childrenElements.push(childElement);
        }
      });
    }

    if (/[A-Z]/.test(astNode.node[0])) {
      return this.__createComponent(astNode, ctx, childrenElements);
    }

    const element = this.__getNode(astNode, ctx);

    if (astNode.props) {
      const props = this.__replaceProps(astNode.props, ctx);
      Object.keys(props).forEach((prop) => {
        const propValue = props[prop];
        const value = typeof propValue === 'function'
          ? propValue(ctx)
          : propValue;

        element.setAttribute(prop, value);
      });
    }

    console.log('element', element);
    console.log('childrenElements', childrenElements);
    childrenElements.forEach((child) => {
      element.appendChild(child);
    });

    return element;
  }

  __createDomElements(ast, ctx) {
    if (ast.node !== 'root') {
      throw new Error(`Should be root element! Received: ${ast.node}`);
    }

    if (ast.children.length === 0) {
      return null;
    }

    if (ast.children.length > 1) {
      // at least for now
      throw new Error('Should be only one parent element for component!');
    }

    return this.__createDomElement(ast.children[0], ctx);
  }

  __compileTemplate(template, ctx) {
    console.log('template', template, 'ctx', ctx);
    const ast = this.__createAST(template);
    console.log('ast', ast);
    const element = this.__createDomElements(ast, ctx);
    console.log('element', element);
    return element;
  }
}
