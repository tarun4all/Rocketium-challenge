import React, { useState, useEffect } from 'react';
import ChatCloud from './chatCloud';
import Textbox from './textbox';

function Chatbox() {
    return (
        <>
            <div className="content">
                <div className="conversation-wrapper">
                    <ChatCloud msg="Hello Hello" time="5:32PM" avatar="TB" isReceived={false} />
                </div>
                <div className="messaging-area">
                    <Textbox />
                </div>
            </div>
        </>
    );
}

export default Chatbox;
