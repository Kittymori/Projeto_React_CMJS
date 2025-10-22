import React, { useState } from 'react';
import IconChatbot from './IconChatbot'; 
import luriIcon from '../../assets/iconChatbotR.png'; 
const ChatOptionButton = ({ text, onClick }) => (
    <button
        onClick={onClick}
        style={{
            backgroundColor: 'transparent',
            color: '#00ccff',
            border: '2px solid #00ccff', 
            borderRadius: '5px',
            padding: '10px 15px',
            marginTop: '10px',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#00ccff20'} 
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
        {text}
    </button>
);

const ChatbotUI = ({ onClose }) => {
    const [inputText, setInputText] = useState('');
    const panelStyle = {
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: '#0a1930',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        borderBottom: '1px solid #1e3c72',
        backgroundColor: '#0a1930',
        borderRadius: '10px 10px 0 0',
        position: 'sticky',
        top: 0
    };
    
    const inputAreaStyle = {
        display: 'flex',
        borderTop: '1px solid #1e3c72',
        padding: '10px 15px',
        backgroundColor: '#0a1930',
        alignItems: 'center',
    };

    return (
        <div style={panelStyle}>
            <div style={headerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconChatbot 
                        src={luriIcon} 
                        alt="Ícone da Continha" 
                        size="24px" 
                        isRounded={true} 
                        style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Continha</span>
                </div>
                <div>
                    <button onClick={onClose} style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#00ccff', 
                        fontSize: '1.2em', 
                        cursor: 'pointer' 
                    }}>X</button>
                </div>
            </div>
            <div style={{ flexGrow: 1, padding: '15px', overflowY: 'auto' }}>
                <p style={{ margin: '0 0 15px 0', color: '#ccc', fontSize: '0.9em' }}>
                    Oi, eu sou Continha :) Estou aqui para te ajudar caso tenha alguma dúvida sobre Tributação.
                </p>
                
                <ChatOptionButton text="Como posso verificar a Renda Mensal?" onClick={() => console.log('Opção 1')} />
                <ChatOptionButton text="Qual a diferença entre PF e PJ?" onClick={() => console.log('Opção 2')} />

                <p style={{ margin: '15px 0 0 0', color: '#00ccff', textAlign: 'right', fontSize: '0.8em', cursor: 'pointer' }}>Limpar conversa</p>
            </div>

            <div style={inputAreaStyle}>
                <input
                    type="text"
                    placeholder="Escreva sua mensagem..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        border: '1px solid #1e3c72',
                        backgroundColor: '#152540',
                        color: 'white',
                        borderRadius: '20px',
                        marginRight: '10px',
                        outline: 'none',
                    }}
                />
                <button 
                    style={{ 
                        backgroundColor: '#00ccff', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => {
                        console.log("Mensagem enviada:", inputText);
                        setInputText('');
                    }}
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default ChatbotUI;