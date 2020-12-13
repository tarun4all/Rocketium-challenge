import io from 'socket.io-client';
import React, { useState, useEffect, useContext } from 'react';
import { store } from './store/store';

var socket = io('http://127.0.0.1:8000');

socket.on('connect', function () {
    console.log("connected");
});

function SocketService() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const { avatar, chat } = state;

    useEffect(() => {
        if (avatar) socket.emit("setAvatar", state.avatar);
    }, [avatar]);

    useEffect(() => {
        if (chat.length) socket.emit("sendMsg", chat[chat.length - 1]);
    }, [chat.length]);

    socket.on('master', function (data) {
        dispatch({ type: "AVATAR_FREE", value: true });
    });

    socket.on('error', function (error) {
        alert(error);
    });

    socket.on('msg', function (msgObj) {
        if (socket.id !== msgObj.id) {

        }
    });

    socket.on('welcome', function (data) {
        console.log(data);
        if (data.allowedToSend) dispatch({ type: "ALLOW_SEND", value: true });
    });

    socket.on('disconnect', function () {
        console.log("Disconnected");
    });

    return <div></div>;
}

export default SocketService;