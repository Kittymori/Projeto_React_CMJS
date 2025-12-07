import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import CalculadoraForm from './components/CalculadoraForm.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotUI from './components/Chatbot/ChatbotUI.jsx';
import ChatbotToggle from './components/Chatbot/ChatbotToggle.jsx';
import ResultadoComparacao from './components/ResultadoComparacao.jsx';
import './App.css';
import './index.css';
import CadastroUsuario from "./components/cadastro/CadastroUsuario.jsx";
const API_CALCULO_ENDPOINT = "https://improved-waffle-pjgv7xrv6rgxhr7vp-3000.app.github.dev/calculo/simular"; 
const API_EMAIL_ENDPOINT = "https://improved-waffle-pjgv7xrv6rgxhr7vp-3000.app.github.dev/email/enviar"; 


function App() {
    
    const [dadosFormulario, setDadosFormulario] = useState(null); 
    const [resultadoPF, setResultadoPF] = useState(null); 
    const [resultadoPJ, setResultadoPJ] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    
    const handleCalculo = async (dadosParaBackend) => {

        try {
            // 1. CHAMADA AO BACKEND (CÁLCULO)
            const response = await axios.post(API_CALCULO_ENDPOINT, {
                renda: dadosParaBackend.renda,
                custos: dadosParaBackend.custos,
                tipoCalculo: dadosParaBackend.tipoCalculo
            });
            
            // 2. ATUALIZAÇÃO DOS ESTADOS COM OS DADOS RETORNADOS DO BACKEND
            const { dadosEntrada, resultadoPF, resultadoPJ } = response.data.dados; 

            setDadosFormulario(dadosEntrada);
            setResultadoPF(resultadoPF);
            setResultadoPJ(resultadoPJ);
            
            console.log("Sucesso na Validação e Cálculo do Backend.");
            
            // 3. ROLAR PARA O RESULTADO
            setTimeout(() => {
                const el = document.getElementById('resultado-comparacao');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 150);

            // 4. CHAMADA AO BACKEND (ENVIO DE E-MAIL)
            if (dadosParaBackend.enviarEmail && dadosParaBackend.emailUsuario) {
                console.log("Iniciando envio de e-mail para:", dadosParaBackend.emailUsuario);
                
                // Monta o objeto com os dados necessários para o EmailService
                const dadosParaEmail = {
                    destinatario: dadosParaBackend.emailUsuario,
                    renda: dadosParaBackend.renda,
                    custos: dadosParaBackend.custos,
                    tipoCalculo: dadosParaBackend.tipoCalculo
                };

                await axios.post(API_EMAIL_ENDPOINT, dadosParaEmail);

                console.log("✅ E-mail enviado com sucesso para o Mailtrap.");
            }

        } catch (error) {
            console.error("Erro ao processar a requisição:", error);
            
            let errorMessage = "Erro ao calcular. Verifique se o backend está ativo.";

            // Trata erro de e-mail especificamente
            if (error.config && error.config.url === API_EMAIL_ENDPOINT) {
                errorMessage = "Cálculo efetuado, mas houve uma falha ao enviar o e-mail. Verifique o console para detalhes.";
                console.error("Falha no envio do e-mail:", error.response?.data || error.message);
            } else {
                console.error("Falha no cálculo:", error.response?.data || error.message);
            }

            alert(errorMessage);
        }
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
                            
                                {/* Renderiza o resultado SOMENTE quando todos os dados estiverem no estado */}
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

                    <Route path='/cadastro' element={<CadastroUsuario />} />
                </Routes>

                {isChatOpen && <ChatbotUI onClose={toggleChat} />}
                {!isChatOpen && <ChatbotToggle isOpen={isChatOpen} onClick={toggleChat} />}

            </main>

            <Footer />

        </div>
    );
}

export default App;