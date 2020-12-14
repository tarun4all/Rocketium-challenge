import React, { createContext, useReducer } from 'react';

const initialState = {
    avatar: '',
    msg: "",
    isAvatarFree: false,
    allowedToSend: false,
    chat: [],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SEND_CHAT': return { ...state, msg: action.value }; break;
            case 'UPDATE_CHAT':
                const _state = { ...state };
                _state.chat = [..._state.chat, { chat: action.msg, isReceived: action.isReceived, avatar: action.avatar, time: action.time }];
                return { ..._state }; break;
            case 'AVATAR_FREE':
                return { ...state, isAvatarFree: action.value }; break;
            case 'SET_AVATAR':
                return { ...state, avatar: action.value }; break;
            case 'ALLOW_SEND': return { ...state, allowedToSend: true }; break;
            default:
                return { ...state }; break;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }