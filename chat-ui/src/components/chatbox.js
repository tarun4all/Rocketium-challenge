import React, { useState, useEffect, useContext } from 'react';
import ChatCloud from './chatCloud';
import Textbox from './textbox';
import { store } from '../store/store';

function Chatbox() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const sendChat = (value) => {
        console.log("clicked");
        dispatch({ type: "SEND_CHAT", value });
    }

    return (
        <>
            <div className="content">
                <div className="conversation-wrapper">
                    {
                        state.chat.map((chat, idx) => <ChatCloud key={idx} msg={chat.chat} time={chat.time} avatar={chat.avatar} isReceived={chat.isReceived} />)
                    }
                </div>
                <div className="messaging-area">
                    {state.allowedToSend && <Textbox sendChat={sendChat} />}
                </div>
            </div>
        </>
    );
}

export default Chatbox;
