import { fixture, assert, html } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../arc-info-message.js';

describe('<arc-info-message>', function() {
  async function basicFixture() {
    return await fixture(html`
      <arc-info-message
        title="test-title"
        message="test-message"
        timestamp="1507842822597"
        linklabel="test-link-label"
        linkaction="https://test.com"></arc-info-message>`);
  }

  async function noActionFixture() {
    return await fixture(html`
      <arc-info-message
        title="test-title"
        message="test-message"
        timestamp="1507842822597"></arc-info-message>`);
  }

  it('renders action link when set', async () => {
    const element = await basicFixture();
    const a = element.shadowRoot.querySelector('.action');
    assert.ok(a);
  });

  it('does not render action link when not set', async () => {
    const element = await noActionFixture();
    const a = element.shadowRoot.querySelector('.action');
    assert.notOk(a);
  });

  it('dispatches open-external-url when link click', async () => {
    const element = await basicFixture();
    let called = false;
    element.addEventListener('open-external-url', (e) => {
      e.preventDefault();
      called = true;
    });
    const a = element.shadowRoot.querySelector('.action a');
    MockInteractions.tap(a);
    assert.isTrue(called);
  });

  it('dispatches analytics event when link click', async () => {
    const element = await basicFixture();
    element.addEventListener('open-external-url', (e) => {
      e.preventDefault();
    });
    const spy = sinon.spy();
    element.addEventListener('send-analytics', spy);
    const a = element.shadowRoot.querySelector('.action a');
    MockInteractions.tap(a);
    assert.isTrue(spy.called);
  });
});
