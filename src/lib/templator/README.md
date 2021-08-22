# Шаблонизатор
Используется собственный шаблонизатор

## Использование
```javascript
// Шаблон
const template = '<span>{{ name }}</span>';
const templator = new Templator(template);

// передадим контекст для шаблона
const htmlString = templator.compile({
  name: 'John Doe'
});

// результат: <span>John Doe</span>
```

## Компоненты
Можно вынести повторяемый код в компоненты

```javascript
// Компонент Person
const Person = () => `
  <span>{{ name }}</span>
`

// Шаблон
const template = '<Person ctx={{ person }} />';
// Необходимо передать все используемые компоненты в шаблонизатор
const templator = new Templator(template, { Person });

// передадим контекст для шаблона
const htmlString = templator.compile({
  person: {
      name: 'John Doe'
  }
});

// результат: <span>John Doe</span>
```

Компоненты могут содержать другие компоненты

## Контейнеры
Несколько компонентов можно группировать в контейнеры. Контейнер - это обычный компонент, который содержит ключевое слово `{{children}}`, куда подставятся вложенные элементы во время рендера

```javascript
// Компонент Container
const Container = () => '<div>{{children}}</div>';

// Шаблон
const template = `
  <Container>
    <span>{{ name }}</span>
  </Container>
`;
// Необходимо передать все используемые компоненты и контейнеры в шаблонизатор
const templator = new Templator(template, { Container });

// передадим контекст для шаблона
const htmlString = templator.compile({
  name: 'John Doe'
});

// результат: <div><span>John Doe</span></div>
```

## Модификаторы
Компоненты и контейнеры поддерживают модификаторы.

Необходимо определить ключ `modifier` в который передать строковые модификаторы, разделенные запятой. При рендере в компонент будет передан объект, содержащий все параметры как ключи.

```javascript
// Компонент Container
const Container = (modifiers) => {
  const classNames = modifiers.centered ? styles.centered : styles.common;
  return `<div class="${classNames}">{{children}}</div>`;
}

// Использование в шаблоне
const template = `
  <Container modifier="centered">
    <span>{{ name }}</span>
  </Container>
`;
```