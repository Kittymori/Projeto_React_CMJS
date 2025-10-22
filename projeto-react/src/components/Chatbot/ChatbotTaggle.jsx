import React from 'react';
import IconChatbot from './IconChatbot'; 
import chatIcon from '../../assets/iconChatbotR.png'; 

const ChatbotToggle = ({ isOpen, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px', 
        right: '20px',  
        zIndex: 1000,   
        
        backgroundColor: '#00ccff',
        color: '#0a1930',           
        border: 'none',
        borderRadius: '50%',       
        width: '60px',             
        height: '60px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', 
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s, transform 0.1s'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#00a3cc'} 
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00ccff'}
      
      aria-expanded={isOpen}
      aria-label="Abrir Assistente de Dúvidas"
    >
      <IconChatbot src={chatIcon} alt="Ícone do Chatbot" size="32px" isRounded={true} />
    </button>
  );
};

export default ChatbotToggle;