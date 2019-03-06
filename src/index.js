import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';
import useQueries from 'history/lib/useQueries';
import configureStore from './configureStore';
import App from './containers/App';
import Modal from 'react-modal';

function renderToElement(elementId, endpointKey) {
  const store = configureStore();
  const history = useQueries(createHistory)();
  Modal.setAppElement('#explorer-app');

  render(
    <Provider store={store} key="provider">
      <App history={history} endpointKey={endpointKey} />
    </Provider>, document.getElementById(elementId));
}

export default renderToElement;
window.Explorer = {
  render: renderToElement
};
