import React from 'react';
import {shallow, mount, render} from 'enzyme';

import App from '../App';

it('renders without crashing', () => {
  shallow( <App /> );
})

it('has working class methods', () => {
  const wrapper = mount(<App />);
  wrapper.instance().setUser('Brady');
  expect(wrapper.state().currentUser).toEqual('Brady')

  wrapper.instance().setActiveRoom('room1')
  expect(wrapper.state().activeRoom).toEqual('room1')
})