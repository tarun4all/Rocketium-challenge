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
    const { avatar, msg } = state;

    useEffect(() => {
        if (avatar) socket.emit("setAvatar", state.avatar);
    }, [avatar]);

    useEffect(() => {
        console.log("sending...");
        if (msg) socket.emit("sendMsg", msg);
    }, [msg]);

    socket.on('master', function (data) {
        dispatch({ type: "AVATAR_FREE", value: true });
    });

    socket.on('error', function (error) {
        alert(error);
    });

    socket.on('msg', function (msgObj) {
        if (msgObj) dispatch({ type: "UPDATE_CHAT", msg: msgObj.msg, avatar: msgObj.avatar, time: msgObj.time, isReceived: socket.id !== msgObj.sendBy ? true : false });
    });

    socket.on('welcome', function (data) {
        console.log(data);
        if (data.allowedToSend) dispatch({ type: "ALLOW_SEND", value: true });
    });

    socket.on('avatarSelected', function (data) {
        dispatch({ type: "AVATAR_FREE", value: false });
    });

    socket.on('disconnect', function () {
        alert("Chat disconnected");
    });

    return <div></div>;
}

export default SocketService;