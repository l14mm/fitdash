import React from 'react';
import { mount } from 'enzyme';

import RequireAuth from '../components/requireAuth';

it('renders without crashing', () => {
  mount(<RequireAuth>
    <div />
  </RequireAuth>);
});
