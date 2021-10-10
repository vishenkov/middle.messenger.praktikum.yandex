import isEqual from '../utils/is-equal';
import render from '../render-dom';

export default class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._pathnameRegExp = null;
    this._blockClass = view;
    this._block = null;
    this._props = props;

    const hasTemplate = this._pathname.match(/:/);

    if (hasTemplate) {
      const regexpProps = this.getTemplateValues(this._pathname);

      let regexpString = String(this._pathname);
      regexpProps.forEach((prop) => {
        regexpString = regexpString.replace(`:${prop}`, `(?<${prop}>\\w+)`);
      });

      const pathNameRegExp = new RegExp(regexpString, 'gm');
      this._pathnameRegExp = pathNameRegExp;
    }
  }

  private getTemplateValues(pathname: string) {
    const propsRegExp = /:([\w]+)/gm;

    let match = null;
    const result = [];
    // eslint-disable-next-line no-cond-assign
    while (match = propsRegExp.exec(pathname)) {
      if (match && match[1]) {
        result.push(match[1]);
      }
    }

    return result;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.getContent().remove();
      this._block = null;
    }
  }

  match(pathname) {
    if (this._pathnameRegExp) {
      return (this._pathnameRegExp).test(pathname);
    }

    return isEqual(pathname, this._pathname);
  }

  private getRouteProps(pathname) {
    if (this._pathnameRegExp) {
      const result = (new RegExp(this._pathnameRegExp)).exec(pathname);

      if (result && result.groups) {
        return result.groups;
      }

      return {};
    }

    return {};
  }

  render(pathname) {
    if (!this._block) {
      const props = this.getRouteProps(pathname);
      this._block = new this._blockClass(props);
      render(this._props.rootQuery, this._block);
    }
  }
}
