import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { Provider } from "react-redux";
import RequireAuth from '../components/requireAuth';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RequireAuth/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
