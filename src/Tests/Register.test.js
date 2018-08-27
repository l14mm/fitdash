import React from 'react';
// import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux'

import reducers from '../reducers';
import Register from '../components/Register';

describe('Register Component', () => {
    const initialState = { auth: { authenticated: true, errorMessage: "error" } };
    // const mockStore = configureStore();

    let store;
    let wrapperShallow;
    let wrapperMount;
    let register = {};

    beforeEach(() => {
        // store = mockStore(initialState);
        store = createStore(
          reducers,
          initialState,
          applyMiddleware(thunk)
        )

        wrapperShallow = shallow(<Register store={store} />);
        register = jest.fn();
        const props = { 
            classes: {},
            register,
            history: {},
        }
        wrapperMount = mount(<Provider store={store}><Register {...props} /></Provider>)
    });

    it('renders', () => {
        expect(wrapperShallow.length).toEqual(1);
    });

    it('submits form', () => {
        const form = wrapperMount.find('form');
        // console.log(register.mock.calls)
        form.props().onSubmit({"prop1":"value"});
        console.log(register)
    })
})