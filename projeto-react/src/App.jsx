import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import CalculadoraForm from './components/CalculadoraForm.jsx'; 
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx'; 

import './App.css'; 

function App() {
    const [dadosFormulario, setDadosFormulario] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false); 

    const handleCalculo = (dadosValidados) => {
        setDadosFormulario(dadosValidados); 
        console.log("--- Sucesso na Validação (App.jsx) ---");
        console.log("Dados prontos para o cálculo (Pessoa A):", dadosValidados);
    };
    
    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <div className="App">
            
            <header>
                <h1>Plataforma de Comparação Tributária</h1>
            </header>

            <Routes>
                <Route 
                    path="/" 
                    element={
                        <CalculadoraForm 
                            onDataSubmit={handleCalculo}
                            onOpenChat={toggleChat}
                        />
                    } 
                />
                
                <Route path="*" element={<h2>Página não encontrada.</h2>} />
            </Routes>
            {isChatOpen && <ChatbotUI onClose={toggleChat} />}
            
            {dadosFormulario && (
                <div>
                    <h3>Seus dados foram recebidos com sucesso!:</h3>
                    <pre>
                        {JSON.stringify(dadosFormulario, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;