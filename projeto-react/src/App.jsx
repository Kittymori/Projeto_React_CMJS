import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CalculadoraForm from './components/CalculadoraForm.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx';
import ChatbotToggle from './components/Chatbot/ChatbotToggle.jsx';
import ResultadoComparacao from './components/ResultadoComparacao.jsx';
import { calculadoraIRPF, calculadoraIRPJ } from './components/CalculadoraIR.jsx'

import './App.css';
import './index.css';


function App() {
    const [dadosFormulario, setDadosFormulario] = useState(null);
    const [resultadoPF, setResultadoPF] = useState(null); 
    const [resultadoPJ, setResultadoPJ] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    const handleCalculo = (dadosValidados) => {
        const resultadoPFCalculado = calculadoraIRPF(
            dadosValidados.rendaMensal, 
            dadosValidados.custosMensais
        );
        setResultadoPF(resultadoPFCalculado);
        
        
        const resultadoPJCalculado = calculadoraIRPJ (dadosValidados.rendaMensal);
        setResultadoPJ(resultadoPJCalculado);
        setDadosFormulario(dadosValidados);
        console.log("Sucesso na Validação");
        console.log("Dados prontos para o cálculo", dadosValidados);
        setTimeout(() => {
            const el = document.getElementById('resultado-comparacao');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 150);
    };

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <div className='App' style={{ padding: '0', width: '100%', margin: '0' }}>

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
                {!isChatOpen && <ChatbotToggle isOpen={isChatOpen} onClick={toggleChat} />}

            </main>

            <Footer />

        </div>
    );
}

export default App;