class Model {
  constructor() {}
}

class View {
  constructor() {
    this.app = this.getElement('#root');

    this.header = this.createElement('div', 'header');

    this.logo = this.createElement('img', 'logo-image');
    this.logo.src = '../assets/images/logo.png';

    this.titleText = this.createElement('p', 'title-text');
    this.titleText.textContent = 'Track your viewing activity on YouTube';

    this.header.append(this.logo, this.titleText);

    this.app.append(this.header);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());
