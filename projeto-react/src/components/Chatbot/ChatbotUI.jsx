import React from 'react';

const ChatbotUI = ({ onClose }) => {
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      width: '300px', 
      height: '400px', 
      border: '1px solid #ccc', 
      backgroundColor: 'white',
      padding: '10px',
      zIndex: 1000
    }}>
      <h3>Chatbot para Dúvidas </h3>
      
      <button onClick={onClose} style={{ float: 'right' }}>
        X
      </button>


    </div>
  );
};

export default ChatbotUI;