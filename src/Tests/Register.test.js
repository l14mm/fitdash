import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Register from '../components/Register';

describe('Register Component', () => {
    const initialState = { auth: { errorMessage: "error" } };
    const mockStore = configureStore();

    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<Register store={store} />);
    });

    it('renders', () => {
        expect(wrapper.length).toEqual(1);
    });
})