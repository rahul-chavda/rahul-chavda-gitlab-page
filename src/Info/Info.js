import React from 'react';
import './Info.css';

function Info() {
    return (
        <div className="Info">
            <h1>Hello,</h1>
            <h3>I am Rahul Chavda</h3>
            <p>
                I am a full-stack developer living in Ahmedabad, India.<br/>
                I spend my day working with backend programming (PHP/Laravel, Node.js/Express), frontend
                frameworks (Angular, React), and mobile platforms (Ionic, React Native).
            </p>
            <p>
                I always enjoy programming and solving problems, and I always try to make myself better with every
                project I work on.<br/>
                Besides programming, I love spending time with friends and family and can often be found together going
                out.
            </p>
            <p>
                <a href="https://www.linkedin.com/in/rahul-chavda/" target="_blank"
                   rel="noopener noreferrer">LinkedIn</a>&nbsp;&bull;&nbsp;
                <a href="https://github.com/rahul-chavda" target="_blank"
                   rel="noopener noreferrer">Github</a>&nbsp;&bull;&nbsp;
                <a href="https://gitlab.com/rahul-chavda" target="_blank"
                   rel="noopener noreferrer">Gitlab</a>
                <br/>
                <a href="mailto:rchavda88@gmail.com" target="_blank" rel="noopener noreferrer">rchavda88@gmail.com</a>
            </p>
        </div>
    );
}

export default Info;