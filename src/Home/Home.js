import React from 'react';
import './Home.css';
import Info from "../Info/Info";
import Bubbles from "../Bubbles/Bubbles";

function Home() {
    return (
        <div className="Home">
            <Bubbles/>
            <Info/>
        </div>
    );
}

export default Home;