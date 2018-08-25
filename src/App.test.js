import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { Provider } from "react-redux";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore}>
      <App />
      </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
