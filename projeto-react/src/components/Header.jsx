import React from 'react';
import Logo from './Logo.jsx';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        padding: '15px 0',
        borderBottom: '4px solid #007284',
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

        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            padding: '15px 0 10px 0',
            marginTop: '10px',
            borderTop: '1px solid rgba(0, 114, 132, 0.3)'
        }}>
            <Link
                to="/"
                style={{
                    color: '#ccc',
                    textDecoration: 'none',
                    fontSize: '1.1em',
                    fontWeight: '500',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = '#007284';
                    e.target.style.backgroundColor = 'rgba(0, 114, 132, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#ccc';
                    e.target.style.backgroundColor = 'transparent';
                }}
            >
                Home
            </Link>

            <Link
                to="/cadastro"
                style={{
                    color: '#ccc',
                    textDecoration: 'none',
                    fontSize: '1.1em',
                    fontWeight: '500',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = '#007284';
                    e.target.style.backgroundColor = 'rgba(0, 114, 132, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = '#ccc';
                    e.target.style.backgroundColor = 'transparent';
                }}
            >
                Cadastrar
            </Link>
        </nav>
    </header>
  );
};

export default Header;