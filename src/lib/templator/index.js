import get from '../get';
import sanitize from '../sanitize';

export default class Templator {
  constructor(template, components) {
    this._template = template;
    this._components = components;

    this.CONTEXT_REGEXP = /\{\{(.*?)\}\}/gi; // Ищем {{ Значение }}
    this.CONTAINER_REGEXP = /<(?<tag>\b[A-Z].*?\b).*?>(.*?)<\/\k<tag>.*?>/g; // Ищем контейнеры компонентов
    this.COMPONENT_REGEXP = /<(\b[A-Z].*?\b).*?\/>/g; // Ищем кастомные компоненты. Должны начинаться с большой буквы
  }

  compile(ctx, components) {
    return this._compileTemplate(ctx, components);
  }

  _getModifiers(componentTemplate) {
    const modifiersValueKey = new RegExp(/modifier="(.*?)"/gi).exec(componentTemplate);

    if (!modifiersValueKey) {
      return {};
    }

    const modifiers = modifiersValueKey[1].split(',')
      .map((modifier) => modifier.trim())
      .reduce((acc, modifier) => ({
        ...acc,
        [modifier]: true,
      }), {});

    return modifiers;
  }

  /*
    Рекурсивно заменяем контейнеры на их представление в html и компоненты
  */
  _replaceContainers(template, ctx) {
    let tmpl = sanitize(template);
    const containerRegExp = this.CONTAINER_REGEXP;
    let key = null;

    // eslint-disable-next-line no-cond-assign
    while ((key = containerRegExp.exec(tmpl))) {
      if (key[1]) {
        const componentValue = key[1].trim();

        const componentFn = this._components[componentValue];

        if (!componentFn) {
          throw new Error(`Unknown component: ${componentValue}`);
        }

        if (typeof componentFn !== 'function') {
          throw new Error(`Component ${componentValue} should be a function!`);
        }

        const modifiers = this._getModifiers(key[0]);

        const rawComponent = componentFn(modifiers);

        const componentWithChildren = rawComponent.replace(new RegExp('{{children}}', 'gi'), key[2]);

        const templator = new Templator(componentWithChildren, this._components);

        const component = templator.compile(ctx);

        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), component);
      }
    }

    return tmpl;
  }

  /*
    Рекурсивно заменяем компоненты на их представление в html
  */
  _replaceComponents(template, ctx) {
    const tmpl = sanitize(template);
    const componentRegExp = this.COMPONENT_REGEXP;
    let key = null;
    let resultTmpl = tmpl;

    // eslint-disable-next-line no-cond-assign
    while ((key = componentRegExp.exec(tmpl))) {
      if (key[1]) {
        const componentValue = key[1].trim();

        const componentFn = this._components[componentValue];

        if (!componentFn) {
          throw new Error(`Unknown component: ${componentValue}`);
        }

        if (typeof componentFn !== 'function') {
          throw new Error(`Component ${componentValue} should be a function!`);
        }

        const ctxValueKey = new RegExp(/ctx=\{\{(.*?)\}\}/gi).exec(key[0]);
        const data = ctxValueKey ? get(ctx, ctxValueKey[1].trim()) : null;

        const modifiers = this._getModifiers(key[0]);

        const rawComponent = componentFn(modifiers);

        const templator = new Templator(rawComponent, this._components);

        const component = templator.compile(data);

        resultTmpl = resultTmpl.replace(new RegExp(key[0], 'gi'), component);
      }
    }

    return resultTmpl;
  }

  /*
    Заменяем шаблонные строки на реальные данные из контекста
  */
  _replaceContext(tmplWithoutComponents, ctx) {
    const tmpl = tmplWithoutComponents;
    let key = null;
    let resultTmpl = tmpl;

    const contextRegExp = this.CONTEXT_REGEXP;
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

  _compileTemplate(ctx) {
    const tmplWithoutContainers = this._replaceContainers(this._template, ctx);
    const tmplWithoutComponents = this._replaceComponents(tmplWithoutContainers, ctx);
    const tmplWithData = this._replaceContext(tmplWithoutComponents, ctx);

    return tmplWithData;
  }
}
