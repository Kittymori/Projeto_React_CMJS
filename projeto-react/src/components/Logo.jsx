import React from 'react';
import LogoUnichristus from '../assets/logoUnichristus.webp'

const Logo = () => {
    return (
        <div style = {{ padding: '10px'}}>
            <img 
                src = {LogoUnichristus} 
                alt = 'Logo Unichritus'
                style={{ height: '50px', width: 'auto', display: 'block', margin: '10px 0 0 30px'}}
                />
        </div>
    );
};

export default Logo;