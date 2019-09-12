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
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import { close } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import '../arc-info-message.js';
/**
 * A list of app messages to be displayed to the user
 *
 * This element is to be used with `<arc-messages-service>` element or
 * any other logic that downloads messages from ARC datastore.
 *
 * ### Example
 *
 * ```
 * <arc-info-messages messages="[[messages]]"></arc-info-messages>
 * <arc-messages-service
 *  platform="chrome"
 *  messages="{{messages}}"
 *  automessages></arc-messages-service>
 * ```
 *
 * ### Styling
 *
 * `<arc-info-messages>` provides the following custom properties and mixins
 * for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--arc-info-messages` | Mixin applied to the element | `{}`
 * `--arc-info-messages-title` | Mixin applied to the title of the list | `{}`
 * `--arc-info-messages-title-container` | Mixin applied to the list title container | `{}`
 * `--arc-info-messages-list` | Mixin applied to the list container. | `{}`
 * `--arc-info-message-separator-color` | Color of the messages separator. | `#C9C9C9`
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
 * `--arc-font-subhead` | Theme font sub-title | `{}`
 * `--arc-font-headline` | Theme font headline | `{}`
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 */
export class ArcInfoMessages extends LitElement {
  static get styles() {
    return css`
    :host {
      display: block;
    }

    h2 {
      font-size: var(--arc-font-headline-font-size);
      font-weight: var(--arc-font-headline-font-weight);
      letter-spacing: var(--arc-font-headline-letter-spacing);
      line-height: var(--arc-font-headline-line-height);
      flex: 1;
    }

    .title-area {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    arc-info-message {
      border-bottom: 1px var(--arc-info-message-separator-color, #C9C9C9) solid;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    `;
  }

  render() {
    const { compatibility } = this;
    const messages = this.messages || [];
    return html`
    <div class="title-area">
      <h2>What’s new</h2>
      <anypoint-icon-button
        @click="${this._sendClose}"
        ?compatibility="${compatibility}">
        <span class="icon">${close}</span>
      </anypoint-icon-button>
    </div>
    <div class="list">
      ${messages.map((item) => html`<arc-info-message
        .title="${item.title}"
        .message="${item.abstract}"
        .timestamp="${item.time}"
        .linkLabel="${item.cta}"
        .linkAction="${item.actionurl}"
        .read="${item.read}"></arc-info-message>`)}
    </div>`;
  }

  static get properties() {
    return {
      // List of messages to display
      messages: { type: Array },
      /**
       * Enables compatibility with Anypoint platform
       */
      compatibility: { type: Boolean },
    };
  }
  /**
   * Sends non-bubbling `close` custom event
   */
  _sendClose() {
    const ev = new CustomEvent('close', {
      cancelable: true,
      bubbles: false
    });
    this.dispatchEvent(ev);
  }
  /**
   * Non-bubbling event fired when the user request to close the view.
   *
   * @event close
   */
}
