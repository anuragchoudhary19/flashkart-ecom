import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducer/rootReducer';
import App from './App';
import Modal from './Modal';
import './index.css';

const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Modal /> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
