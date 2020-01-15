import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import App from './containers/App';
import Modal from 'react-modal';
import { fix_aria_roles, add_iframe_titles } from '../src/a11y_fixes';

function renderToElement(elementId, endpointKey) {
  const store = configureStore();
  const history = createBrowserHistory();
  Modal.setAppElement('#explorer-app');

  render(
    <Provider store={store} key="provider">
      <App history={history} endpointKey={endpointKey} />
    </Provider>, document.getElementById(elementId)
  );
}

export default renderToElement;
window.Explorer = {
  render: renderToElement
};

window.onload = function() {
  setTimeout(function() {
    add_iframe_titles();
    fix_aria_roles();  
  }, 500);
};