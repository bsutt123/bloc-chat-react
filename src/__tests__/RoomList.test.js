import React from 'react';
import {shallow, mount, render} from 'enzyme';
import * as firebase from 'firebase'
import RoomList from '../components/RoomList';
import FirebaseMock from 'firebase-mock';
import '../initializeFirebase';

it('renders without crashing', () => {
  const setActiveRoomMock = jest.fn();
  const setUserMock = jest.fn();
  const mockFirebase = FirebaseMock.MockFirebase;
  shallow(<RoomList 
    firebase={mockFirebase}
    setActiveRoom={setActiveRoomMock}
    setUser={setUserMock}
    currentUser={"Brady"} />)
})

it('correctly handles input change and submission', () => {
  const setActiveRoomMock = jest.fn();
  const setUserMock = jest.fn();
  const mockFirebase = FirebaseMock.MockFirebase;
  const wrapper = shallow( 
    <RoomList
      firebase={firebase}
      setActiveRoom={setActiveRoomMock}   
      setUser = {setUserMock}
      currentUser = {"Brady"}
    />)

    const input = wrapper.find('.new-room-input')
    input.simulate('change', {target: {value: 'new'}});
    expect(wrapper.state().newRoomName).toEqual('new');

    const newRoomButton = wrapper.find('.new-room-btn');
    newRoomButton.simulate('click')
    expect(wrapper.state().newRoomName).toEqual('');
})

it('passed up the new user function through props', () => {
  const setActiveRoomMock = jest.fn();
  const setUserMock = jest.fn();
  const mockFirebase = FirebaseMock.MockFirebase;
  const wrapper = shallow( 
    <RoomList
      firebase={mockFirebase}
      setActiveRoom={setActiveRoomMock}   
      setUser = {setUserMock}
      currentUser = {"Brady"}
    />)
})