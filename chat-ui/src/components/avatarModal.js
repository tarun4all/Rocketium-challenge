import React, { useState, useContext } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { store } from '../store/store';

const AvatarModal = () => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const setAvatar = (label) => {
        dispatch({ type: "SET_AVATAR", value: label });
        dispatch({ type: "AVATAR_FREE", value: false });
    }

    return (
        <div>
            <Modal open={state.isAvatarFree} onClose={() => dispatch({ type: "AVATAR_FREE", value: false })} center>
                <div style={{ padding: "20px" }} className="timestamp">
                    <div onClick={() => setAvatar('RR')} style={{ marginLeft: "5px" }} className="avatar">RR</div>
                    <div onClick={() => setAvatar('RS')} style={{ marginLeft: "5px" }} className="avatar">RS</div>
                    <div onClick={() => setAvatar('BP')} style={{ marginLeft: "5px" }} className="avatar">BP</div>
                    <div onClick={() => setAvatar('JD')} style={{ marginLeft: "5px" }} className="avatar">JD</div>
                    <div onClick={() => setAvatar('MS')} style={{ marginLeft: "5px" }} className="avatar">MS</div>
                </div>
            </Modal>
        </div>
    );
};

export default AvatarModal;