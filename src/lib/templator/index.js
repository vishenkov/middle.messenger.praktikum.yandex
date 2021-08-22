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

  /*
    Рекурсивно заменяем контейнеры на их представление в html и компоненты
    Например,
    Компонент Paper:
      <div class="root">
        {{children}}
      </div>

    Компонент Input:
      <input type="text" />

    Тогда шаблон
      <Paper>
        <Input />
      </Paper>
    приведет к виду
      <div class="root">
        <Input />
      </div>
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

        const rawComponent = componentFn();

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
    Например,
    Компонент Textarea:
      <div class="textarea">
        <Label />
        <Input />
      </div>
    Компонент Label:
      <span>Label</span>
    Компонент Input:
      <input type="text" />

    Тогда шаблон
      <div>
        <Textarea />
      </div>
    приведет к виду
      <div>
        <div class="textarea">
          <span>Label</span>
          <input type="text" />
        </div>
      </div>
  */
  _replaceComponents(template, ctx) {
    let tmpl = sanitize(template);
    const componentRegExp = this.COMPONENT_REGEXP;
    let key = null;

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

        const rawComponent = componentFn();

        const templator = new Templator(rawComponent, this._components);

        const component = templator.compile(data);

        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), component);
      }
    }

    return tmpl;
  }

  /*
    Заменяем шаблонные строки на реальные данные из контекста

    Например,
    ctx = {
      name: 'John'
    };

    <div>{{ name }}</div>

    Получим:
    <div>John</div>
  */
  _replaceContext(tmplWithoutComponents, ctx) {
    let tmpl = tmplWithoutComponents;
    let key = null;

    const contextRegExp = this.CONTEXT_REGEXP;
    // eslint-disable-next-line no-cond-assign
    while ((key = contextRegExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();

        const data = get(ctx, tmplValue);
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
    }

    return tmpl;
  }

  _compileTemplate(ctx) {
    const tmplWithoutContainers = this._replaceContainers(this._template, ctx);
    const tmplWithoutComponents = this._replaceComponents(tmplWithoutContainers, ctx);
    const tmplWithData = this._replaceContext(tmplWithoutComponents, ctx);

    return tmplWithData;
  }
}
