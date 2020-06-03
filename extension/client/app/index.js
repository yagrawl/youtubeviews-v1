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

    this.body = this.createElement('div', 'body');
    this.table = this.createElement('table');
    this.recordActivityTr = this.createElement('tr');
    this.recordActivityLabelTd = this.createElement('td');
    this.recordActivityLabel = this.createElement('p', 'labels');
    this.recordActivityLabel.textContent = 'Record Activity';

    this.recordActivityLabelTd.append(this.recordActivityLabel);

    this.recordActivityToggleTd = this.createElement('td');
    this.recordActivityToggle = this.createElement('label', 'toggle');
    this.recordActivityToggleInput = this.createElement('input', 'toggle-input');
    this.recordActivityToggleInput.type = 'checkbox';
    this.recordActivityToggleInput.checked = true;
    this.recordActivityToggleControl = this.createElement('div', 'toggle-control');

    this.recordActivityToggle.append(this.recordActivityToggleInput, this.recordActivityToggleControl);

    this.recordActivityToggleTd.append(this.recordActivityToggle);

    this.recordActivityTr.append(this.recordActivityLabelTd, this.recordActivityToggleTd);

    this.hideViewsTr = this.createElement('tr');
    this.hideViewsLabelTd = this.createElement('td');
    this.hideViewsLabel = this.createElement('p', 'labels');
    this.hideViewsLabel.textContent = 'Hide Views';

    this.hideViewsLabelTd.append(this.hideViewsLabel);

    this.hideViewsToggleTd = this.createElement('td');
    this.hideViewsToggle = this.createElement('label', 'toggle');
    this.hideViewsToggleInput = this.createElement('input', 'toggle-input');
    this.hideViewsToggleInput.type = 'checkbox';
    this.hideViewsToggleInput.checked = false;
    this.hideViewsToggleControl = this.createElement('div', 'toggle-control');

    this.hideViewsToggle.append(this.hideViewsToggleInput, this.hideViewsToggleControl);

    this.hideViewsToggleTd.append(this.hideViewsToggle);

    this.hideViewsTr.append(this.hideViewsLabelTd, this.hideViewsToggleTd);

    this.table.append(this.recordActivityTr, this.hideViewsTr);
    this.body.append(this.table);

    this.footer = this.createElement('div', 'footer');

    this.aboutLink = this.createElement('a');
    this.aboutLink.href = '/about';
    this.aboutText = this.createElement('p', 'footer-link-text');
    this.aboutText.textContent = 'About';
    this.aboutLink.append(this.aboutText);

    this.privacyPolicyLink = this.createElement('a');
    this.privacyPolicyLink.href = '/privacyPolicy';
    this.privacyPolicyText = this.createElement('p', 'footer-link-text');
    this.privacyPolicyText.textContent = 'Privacy Policy';
    this.privacyPolicyLink.append(this.privacyPolicyText);

    this.helpLink = this.createElement('a');
    this.helpLink.href = '/help';
    this.helpText = this.createElement('p', 'footer-link-text');
    this.helpText.textContent = 'Help';
    this.helpLink.append(this.helpText);

    this.header.append(this.logo, this.titleText);
    this.footer.append(this.aboutLink, this.privacyPolicyLink, this.helpLink);
    this.app.append(this.header, this.body, this.footer);
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
