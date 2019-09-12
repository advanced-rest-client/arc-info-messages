[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-info-messages.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-info-messages)

[![Build Status](https://travis-ci.org/advanced-rest-client/arc-info-messages.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/arc-info-messages)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/arc-info-messages)


# arc-info-messages

A view with a list of app messages for Advanced REST Client.

## Usage

### Installation
```
npm install --save @advanced-rest-client/arc-info-messages
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/arc-info-messages/arc-info-messages.js';

class SampleElement extends LitElement {
  render() {
    const { messages } = this;
    return html`
    <arc-info-messages
      .messages="${messages}"></arc-info-messages>
    <arc-messages-service
      platform="chrome"
      channel="stable"
      @messages-changed="${this._messagesHandler}"
      automessages></arc-messages-service>
    `;
  }

  _messagesHandler(e) {
    this.messages = e.detail.value;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/arc-info-messages
cd arc-info-messages
npm i
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
