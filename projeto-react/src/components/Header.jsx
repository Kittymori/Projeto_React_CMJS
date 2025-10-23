import React from 'react';
import Logo from './Logo.jsx';

const Header = () => {
  return (
    <header 
      style={{
        padding: '15px 0', 
        borderBottom: '4px solid #00ccff', 
        width: '100%',
        backgroundColor: '#05142eff',
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
          margin: '20px',
        }}
      >
        <Logo /> 

        <div style={{ textAlign: 'right' }}>
          <h1 style={{ margin: 0, fontSize: '1.9em', color: 'white' }}>
            Calculadora de Tributação 
          </h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '1.0em', color: '#ccc' }}>
            Pessoa Física e Jurídica para Psicólogos
          </p>
        </div>

      </div>
    </header>
  );
};

export default Header;