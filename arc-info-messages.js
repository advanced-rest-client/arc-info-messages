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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import './arc-info-message.js';
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
 *  auto-messages></arc-messages-service>
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
class ArcInfoMessages extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --arc-info-messages;
    }

    h2 {
      @apply --arc-font-headline;
      @apply --layout-flex;
      @apply --arc-info-messages-title;
    }

    .title-area {
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --arc-info-messages-title-container;
    }

    .list {
      @apply --arc-info-messages-list;
    }

    arc-info-message {
      border-bottom: 1px var(--arc-info-message-separator-color, #C9C9C9) solid;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    </style>
    <div class="title-area">
      <h2>What’s new</h2>
      <paper-icon-button icon="arc:close" on-click="_sendClose"></paper-icon-button>
    </div>
    <div class="list">
      <template is="dom-repeat" items="[[messages]]">
        <arc-info-message title="[[item.title]]" message="[[item.abstract]]" timestamp="[[item.time]]" link-label="[[item.cta]]" link-action="[[item.actionurl]]" read="[[item.read]]"></arc-info-message>
      </template>
    </div>
`;
  }

  static get is() { return 'arc-info-messages'; }
  static get properties() {
    return {
      // List of messages to display
      messages: Array
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
window.customElements.define(ArcInfoMessages.is, ArcInfoMessages);
