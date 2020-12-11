import React, { useState, useEffect } from 'react';

function Textbox() {
    const [text, setText] = useState('');

    return (
        <div>
            <input onChange={(e) => setText(e.target.value)} placeholder="Your message here..." />
            <a className="send"><i className="icon-paper-plane icons"></i></a>
        </div>
    );
}

export default Textbox;
