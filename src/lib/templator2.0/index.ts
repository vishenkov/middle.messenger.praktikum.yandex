import get from '../get';
import sanitize from '../sanitize';

export default class Templator {
  constructor(template, components) {
    this._template = template;
    this._components = components;
    this._tags = [];
  }

  compile(ctx) {
    return this._compileTemplate(this._template, ctx);
  }

  /*
    Заменяем шаблонные строки на реальные данные из контекста
  */
  _replaceContext(tmplWithoutComponents, ctx) {
    const tmpl = tmplWithoutComponents;
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
  }

  _addOpeningTag(tag) {
    // console.log('_addOpeningTag', tag);
    this._tags.push(tag);
  }

  _closeTag(tag) {
    // console.log('_closeTag', tag);
    if (this._tags.length === 0) {
      throw new Error('"{tag}" has no opening tag');
    }

    const lastTag = this._tags[this._tags.length - 1];

    if (tag !== lastTag) {
      throw new Error(`"${tag}" is not matched opening tag "${lastTag}""`);
    }

    this._tags.pop();
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

    return { key, value: (ctx) => this._replaceContext(value, ctx) };
  }

  __parseProps(props) {
    console.log('props', props);
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

    // console.log('resultProps', resultProps);
    return Object.keys(resultProps).length ? resultProps : null;
  }

  __getChildrenAST(template) {
    // console.log('__getChildrenAST', template);
    if (!template) {
      return [null, null];
    }

    const tagRegexp = /(?<fullTag><\/{0,1}(?<tag>\w+)(?<props>.*?)\/?>)(?<rest>[\s\S]{0,})$/gm;
    const match = tagRegexp.exec(template);
    if (!match) {
      return [{
        node: 'raw',
        props: null,
        children: [template],
      }, null];
    }

    if (match.index > 0) {
      const rawNode = template.slice(0, match.index);
      const isEmptyRawNode = sanitize(rawNode).trim().length === 0;
      const restTemplate = template.slice(match.index);
      // console.log('rawNode', rawNode, 'restTemplate', restTemplate, match.index);
      if (isEmptyRawNode) {
        return this.__getChildrenAST(restTemplate);
      }

      return [{
        node: 'raw',
        props: null,
        children: [rawNode],
      }, restTemplate];
    }

    const {
      props, rest, tag, fullTag,
    } = match.groups;

    const isClosingTag = fullTag.startsWith('</');
    const isSelfClosingTag = fullTag.endsWith('/>');

    if (isClosingTag) {
      this._closeTag(tag);
      return [null, rest];
    }

    if (!isSelfClosingTag) {
      this._addOpeningTag(tag);
    }

    // console.log('props', props);
    const parsedProps = this.__parseProps(props);
    // console.log('parsedProps', parsedProps)
    if (isSelfClosingTag) {
      return [{
        node: tag,
        props: parsedProps,
        children: null,
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
      astNode.children = null;
    }

    return [astNode, restTemplate];
  }

  _createAST(template) {
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

  _compileTemplate(template, ctx) {
    console.log('template', template, 'ctx', ctx);
    const ast = this._createAST(template, ctx);
    console.log('ast', ast);
    return ast;
    // const tmplWithoutContainers = this._replaceContainers(template, ctx);
    // const tmplWithoutComponents = this._replaceComponents(tmplWithoutContainers, ctx);
    // const tmplWithData = this._replaceContext(tmplWithoutComponents, ctx);

    // return tmplWithData;
  }
}
