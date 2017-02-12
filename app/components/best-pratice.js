// avoid methods that change the state
// custom elements are intentionally a low-level API
class ExampleElement extends HTMLElement {

  constructor() {
    super();
    // no inspecting attributes or children!
  }

  static get observedAttributes() {
    return ['selected'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // An attribute was added, removed, updated or replaced
    // Also called for initial values when
    // an element is created by the parser, or
    // upgraded
    this[attrName] = newVal;
  }

  // synchronise attribute and properties

  set selected(value) {
    if (Object.is(this._selected, value)) {
      return;
    }
    this._selected = value;
  }

  get selected() {
    return this._selected;
  }

  connectedCallback() {

    // Called every time the element is inserted
    // into the DOM
    // Useful for running setup code, such as
    // fetching resources or rendering

  }

  disconnectedCallback() {

    // Called every time the element is removed
    // from the DOM
    // Useful for running clean up code
    // (Removing event listeners, destroying timers, etc)

  }

}

// Dispatch events for ANY state change
class ExampleCheckbox extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  onClick() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('checked-changed'), {
      detail: {
        checked: this.checked
      },
      bubbles: false
    });

  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick, false);
  }

}

class ExampleClock extends HTMLElement {

  constructor() {
    super();
  }

  static get is() {
    return 'example-clock';
  }

  static get observedAttributes() {
    return ['time'];
  }

  connectedCallback() {
    this.innerHTML = `<div>The time is: <span></span></div>`;
  }

  attributeChangedCallBack(attrName, oldValue, newValue) {
    this[attrName] = newValue;
  }

  set time(value) {
    if (Object.is(this._time, value)) {
      return;
    }
    this._time = value;
    const span = this.querySelector('span');
    span.textContent = value;
  }

}