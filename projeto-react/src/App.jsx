import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import CalculadoraForm from './components/CalculadoraForm.jsx'; 
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx'; 
import ResultadoComparacao from './components/ResultadoComparacao.jsx';

import './App.css'; 
import './index.css';

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
        <div className= 'App'style={{ padding: '0', width: '100%', margin: '0'}}>
            
            <Header /> 

            <main>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <div className="container-principal"> 
                                
                                <CalculadoraForm 
                                    onDataSubmit={handleCalculo}
                                    onOpenChat={toggleChat}
                                />

                                {dadosFormulario && resultadoPF && resultadoPJ && (
                                    <ResultadoComparacao 
                                        dadosEntrada={dadosFormulario} 
                                        resultadoPF={resultadoPF} 
                                        resultadoPJ={resultadoPJ} 
                                    />
                                )}
                            </div>
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