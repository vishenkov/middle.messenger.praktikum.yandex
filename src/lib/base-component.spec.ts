import { expect } from 'chai';
import BaseComponent, { Props } from './base-component';
import Native from '../components/native';

class TestComponent extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return `<div>${this.props.text}</div>`;
  }
}

describe('Base component', () => {
  it('Should use props', () => {
    const props = { text: 'some text' };
    const testComponent = new TestComponent(props);
    const content = testComponent.getContent();

    expect(content.textContent).to.equal(props.text);
  });

  it('Should set props', () => {
    const props = { text: 'some text' };
    const testComponent = new TestComponent(props);

    const updatedProps = { text: 'new text' };
    testComponent.setProps(updatedProps);

    const content = testComponent.getContent();

    expect(content.textContent).to.equal(updatedProps.text);
  });
});
