import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CalculadoraForm from './components/CalculadoraForm.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx';
import ChatbotToggle from './components/Chatbot/ChatbotToggle.jsx';
import ResultadoComparacao from './components/ResultadoComparacao.jsx';

import './App.css';
import './index.css';

function calculadoraIRPF(rendaMensal, custosMensais) {
    
    const renda = Number(rendaMensal);
    const custos = Number(custosMensais);
    const basePF = renda - custos;
    let imposto = 0;
    let deducao = 0;

    if (basePF <= 2428.8) {
        imposto = 0;
        deducao = 0;
    } else if (basePF >= 2428.81 && basePF <= 2826.65) {
        deducao = 142.80;
        imposto = (basePF * 0.075) - deducao;  
    } else if (basePF >= 2826.66 && basePF <= 3751.05) {
        deducao = 394.16;
        imposto = (basePF * 0.15) - deducao;
    } else if (basePF >= 3751.06 && basePF <= 4664.68) {
        deducao = 675.49;
        imposto = (basePF * 0.225) - deducao;
    } else {
        deducao = 908.73;
        imposto = (basePF * 0.275) - deducao;
    }

    
    imposto = Math.max(0, imposto);
    const rendaLiquida = renda - imposto;

    return {
        rendaMensal: renda,
        custosMensais: custos,
        basePF,
        deducao,
        imposto, 
        rendaLiquida
    };

}
function calculadoraIRPJ(rendaMensal){
    const renda = Number(rendaMensal);
    const simples_nac = renda * 0.06;
    const pro_labore = renda * 0.11;
    const perce28 = renda < 1518.01 ? 1518 : renda * 0.28;
    const imposto = simples_nac + pro_labore;
    const rendaLiquida = renda - imposto;
    return {
        rendaMensal: renda,
        perce28,
        simples_nac,
        pro_labore,
        imposto,
        rendaLiquida
    };

}

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