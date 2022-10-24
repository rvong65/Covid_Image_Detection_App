import React from 'react';
import Logo from './Logo';

const Navigation = () => {
    return(
        <div className="fixed w-100 top-0">
            <nav className="ttu tracked">
                <Logo style={{position: "absolute", left: 1, top: 1}}/>
                <h1 style={{position: "absolute", left: 105, top: 25, fontWeight:"bold", color:"white"}}>Covid-19 Detection</h1>
            </nav>
        </div>
    );
}

export default Navigation;