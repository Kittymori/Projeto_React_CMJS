import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import CalculadoraForm from './components/CalculadoraForm.jsx'; 
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx'; 

import './App.css'; 

function App() {
    const [dadosFormulario, setDadosFormulario] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false); 

    const handleCalculo = (dadosValidados) => {
        setDadosFormulario(dadosValidados); 
        console.log("Sucesso na Validação");
        console.log("Dados prontos para o cálculo", dadosValidados);
    };
    
    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <div className="App">
            
            <Header /> 

            <main>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <CalculadoraForm 
                                    onDataSubmit={handleCalculo}
                                    onOpenChat={toggleChat}
                                />
                                {dadosFormulario && (
                                    <div className="resultado-debug">
                                        <h3>Seus dados foram recebidos com sucesso!:</h3>
                                        <pre>
                                            {JSON.stringify(dadosFormulario, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </>
                        } 
                    />
                    
                    <Route path="*" element={<h2>Página não encontrada.</h2>} />
                </Routes>
                
                {isChatOpen && <ChatbotUI onClose={toggleChat} />}
            </main>
            
            <Footer />
            
        </div>
    );
}

export default App;