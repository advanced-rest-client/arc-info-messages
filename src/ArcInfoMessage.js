/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html, css } from 'lit-element';
import '@advanced-rest-client/date-time/date-time.js';
/**
 * A message item for the messages list.
 *
 * ### Example
 *
 * ```html
 * <arc-info-message
 *  title="Hello world!"
 *  message="This is a message"
 *  timestamp="1507842822597"
 *  linklabel="Read more about this"
 *  linkaction="https://domain.com"></arc-info-message>
 * ```
 *
 * ### Styling
 *
 * `<arc-info-messages>` provides the following custom properties and mixins
 * for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--arc-info-message` | Mixin applied to the message item | `{}`
 * `--arc-info-message-title-weight` | Message title width | `400`
 * `--arc-info-message-unread-title-weight` | Message title width when unread. | `500`
 * `--arc-info-message-title` | Mixin applied to the title of the message | `{}`
 * `--arc-info-message-date-color` | Color of the date label | `rgba(0, 0, 0, 0.64)`
 * `--arc-info-message-date` | Mixin applied to the date label | `{}`
 * `--arc-info-message-content-color` | Color of the message | `rgba(0, 0, 0, 0.74)`
 * `--arc-info-message-content` | Mixin applied to the mesage container. | `{}`
 * `--arc-info-message-action-color` | Color of the action link | `--primary-color`
 * `--arc-info-message-action` | Mixin applied to the action link | `{}`
 * `--arc-info-message-action-container` | Mixin applied to message's action container | `{}`
 * `--arc-font-body1` | Theme font | `{}`
 * `--arc-font-subhead` | Theme font title | `{}`
 *
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 */
export class ArcInfoMessage extends LitElement {
  static get styles() {
    return css`:host {
      display: block;
    }

    h3 {
      font-size: var(--arc-font-subhead-font-size);
      line-height: var(--arc-font-subhead-line-height);
      font-weight: var(--arc-info-message-title-weight, 400);
    }

    :host[read="0"] h3 {
      font-weight: var(--arc-info-message-unread-title-weight, 500);
    }

    .time {
      margin: 0 0 12px 0;
      padding: 0;
      color: var(--arc-info-message-date-color, rgba(0, 0, 0, 0.64));
    }

    .message {
      margin: 0;
      padding: 0;
      color: var(--arc-info-message-content-color, rgba(0, 0, 0, 0.74));
    }

    a {
      color: var(--arc-info-message-action-color, var(--primary-color));
    }

    .action {
      margin: 12px 0;
    }`;
  }

  render() {
    const { title, timestamp, message, hasAction, linkAction, linkLabel } = this;
    return html`
    <h3>${title}</h3>
    <p class="time">
      <date-time
        .date="${timestamp}"
        year="numeric"
        month="long"
        day="numeric"
        hour="numeric"
        minute="numeric"></date-time>
    </p>
    <p class="message">${message}</p>
    ${hasAction ? html`<div class="action">
      <a target="_blank" href="${linkAction}" @click="${this._openMessage}">${linkLabel}</a>
    </div>` : ''}`;
  }

  static get properties() {
    return {
      // Title of the message
      title: { type: String },
      // Message to display
      message: { type: String },
      // Label for the action
      linkLabel: { type: String },
      // Action link.
      linkAction: { type: String },
      // Message timestamp
      timestamp: { type: String },
      // `0` means that the message is unread.
      read: { type: Number, reflect: true }
    };
  }

  get hasAction() {
    const { linkAction, linkLabel } = this;
    return !!(linkAction && linkLabel);
  }
  /**
   * Handles click on the action item.
   * It dispatches `open-external-url` for the app to open the window
   * in a native way for the platform or it uses `window.open` if the event
   * is not handled.
   *
   * @param {MouseEvent} e
   */
  _openMessage(e) {
    e.preventDefault();
    const url = this.linkAction;
    const ev = new CustomEvent('open-external-url', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        url
      }
    });
    this.dispatchEvent(ev);
    this._reportMessageOpen();
    if (ev.defaultPrevented) {
      return;
    }
    window.open(url);
  }

  // Reports GA action.
  _reportMessageOpen() {
    const ev = new CustomEvent('send-analytics', {
      detail: {
        type: 'event',
        category: 'arc-info-messages',
        action: 'Opened',
        label: this.title
      },
      cancelable: true,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(ev);
  }
}
