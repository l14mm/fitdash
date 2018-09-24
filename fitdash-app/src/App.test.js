import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from 'redux-mock-store';
import { Provider } from "react-redux";

const initialState = { id: 1 };
const mockStore = configureMockStore(initialState)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore}>
      <App>
        <div />
      </App>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
