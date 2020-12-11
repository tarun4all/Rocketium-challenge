import React, { useState, useEffect } from 'react';

function ChatCloud({ isReceived, msg, time, avatar }) {
    return (
        <div className={`${isReceived ? "message-received" : "message-sent"}`}>
            <div className="bubble">{msg}</div>
            <div className="timestamp">
                <div className="time">{time}</div>
                <div className="avatar">{avatar}</div>
            </div>
        </div>
    );
}

export default ChatCloud;
