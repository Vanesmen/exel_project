class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(domEl) {
    if (domEl instanceof Dom) {
      domEl = domEl.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(domEl);
    } else {
      this.$el.appendChild(domEl);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get data() {
    return this.$el.dataset;
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}


$.create = (tagName, classNames) => {
  const $el = document.createElement(tagName);
  if (classNames) {
    $el.classList.add(classNames);
  }

  return new Dom($el);
};

