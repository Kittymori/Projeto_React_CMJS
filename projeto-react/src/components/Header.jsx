import React from 'react';
import Logo from './Logo.jsx';

const Header = () => {
  return (
    <header style={{padding: '15px', margin: '10px 0', borderBottom: '1px solid #ffffffff', width: '100%', backgroundColor: '#000147ff' }}>
      
      <Logo />

      <div style = {{ textAlign: 'right'}}>
        <h1 style={{ margin: 0, fontSize:'1.9em', color: '#ffffffff' }}>
          Calculadora de Tributação  
        </h1>
        <p style = {{ margin: '5px 20px 5px 0', fontSize: '1.0em', color: '#ffffffff', padding: '0 0 50px 0'}}>
          Pessoa Física e Jurídica para Psicólogos
        </p>

      </div>
    </header>
  );
};

export default Header;