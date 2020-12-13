import React, { createContext, useReducer } from 'react';

const initialState = {
    avatar: '',
    isAvatarFree: false,
    allowedToSend: false,
    chat: [],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SEND_CHAT':
                const _state = { ...state };
                _state.chat = [..._state.chat, { chat: action.value, isReceived: false, avatar: 'TB', time: "7:22PM" }];
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