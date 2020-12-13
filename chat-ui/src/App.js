import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Chatbox from './components/chatbox';
import { StateProvider, store } from './store/store';
import AvatarModal from './components/avatarModal';
import SocketService from './socketConnection';

function App() {
  return (
    <StateProvider>
      <div>
        <SocketService />
        <AvatarModal />
        <Chatbox />
      </div>
    </StateProvider>
  );
}

export default App;
