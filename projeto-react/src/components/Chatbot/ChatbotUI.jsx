import React, { useState, useRef, useEffect, useCallback } from 'react';
import IconeContinha from '../../assets/iconChatbotR.png';


const FALLBACK_ICON = 'https://placehold.co/24x24/00ccff/ffffff?text=AI';
const ICON_SRC = IconeContinha;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
// Constante para a URL da API Gemini do Google
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;
// Constante para se comunicar com a API Gemini do Google aqui ficam as instruções do sistema para o chatbot 
const systemInstruction = `Você é a Continha (não precisa se apresentar na mesma conversa somente se a conversa for limpa), uma assistente virtual especializada em simplificar informações sobre tributação e cálculos de Pessoa Física (PF) e Pessoa Jurídica (PJ). Seu objetivo é dar respostas diretas, úteis e amigáveis, sempre no contexto financeiro e tributário. Responsda elogios com elogios, se tentarem ser rudes devolva com elogios com um pouco de sarcasmo. Mantenha as respostas concisas e informativas, além de armazenar as informações que já foram solicitadas anteriormente. Ser capaz de calcular os resultados básicos de tributação e finanças quando solicitado.`;

// Componente para exibir o ícone do chatbot como fallback, ou seja como uma alternativa caso a imagem principal não carregue
const IconContinha = ({ src, alt, size, isRounded, style }) => (
    <img 
        src={src || FALLBACK_ICON} 
        alt={alt} 
        style={{ 
            width: size, 
            height: size, 
            borderRadius: isRounded ? '50%' : '0', 
            objectFit: 'cover',
            ...style 
        }}
        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_ICON; }}
    />
);

// Botões para selecionar as opções de sugestões de perguntas para o chatbot
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
// Renderiza cada mensagem no chat, com estilos diferentes para o usuário e para o modelo (chatbot)
const Message = ({ message }) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start', 
        marginBottom: '10px' 
    }}>
        <div style={{
            maxWidth: '80%',
            padding: '10px 15px',
            borderRadius: '18px',
            backgroundColor: message.role === 'user' ? '#00ccff' : '#152540',
            color: message.role === 'user' ? '#05142e' : 'white',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            fontSize: '0.9em',
            lineHeight: '1.4'
        }}>
            {message.text}
        </div>
    </div>
);

// Componentes principal do chatbot
const ChatbotUI = ({ onClose }) => {
    // Texto de entrada do usuário
    const [inputText, setInputText] = useState('');
    // Permite armazenar as mensagens trocadas com o chatbot até o histórico ser limpo ou a página ser recarregada
    const [messages, setMessages] = useState([]);
    // Indica que o chatbot está respondendo à mensagem do usuário
    const [isLoading, setIsLoading] = useState(false);
    // Rola a conversa para a última mensagem automaticamente
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
        const payload = {
        contents: [{ role: 'user', parts: [{ text }] }],
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        }
        };

        const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        });

        const result = await response.json();
        const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        const modelMessage = {
        role: 'model',
        text: responseText?.trim() || 'Desculpe, não consegui entender a resposta.'
        };

        setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error(error);
        setMessages(prev => [
        ...prev,
        { role: 'model', text: 'Ocorreu um erro ao tentar responder. Tente novamente mais tarde.' }
        ]);
    } finally {
        setIsLoading(false);
    }
    };
    
    // Limpa o histórico de mensagens do chatbot
    const handleClearChat = () => {
        setMessages([]);
        console.log('Conversa limpa! Olá, eu sou Continha :)'); 
    };

    const panelStyle = {
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: '#05142eff',
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
        backgroundColor: '#05142eff',
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
    
    const loadingStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '10px 15px',
        fontSize: '0.8em',
        color: '#00ccff',
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputText);
        }
    };

    return (
        <div style={panelStyle}>
            <div style={headerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconContinha 
                        src={ICON_SRC} 
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
                
                {messages.length === 0 && (
                    <>
                        <p style={{ margin: '0 0 15px 0', color: '#ccc', fontSize: '0.9em' }}>
                            Oi, eu sou Continha :) Estou aqui para te ajudar caso tenha alguma dúvida sobre Tributação, Cálculos PF/PJ e Finanças.
                        </p>
                        
                        <ChatOptionButton 
                            text="Como posso verificar a Renda Mensal?" 
                            onClick={() => handleSendMessage("Como posso verificar a Renda Mensal?")} 
                        />
                        <ChatOptionButton 
                            text="Qual a diferença entre PF e PJ?" 
                            onClick={() => handleSendMessage("Qual a diferença entre PF e PJ?")} 
                        />
                    </>
                )}

                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
                
                {isLoading && (
                    <div style={loadingStyle}>
                        Continha está digitando...
                    </div>
                )}
                
                <div ref={messagesEndRef} /> 

                {messages.length > 0 && (
                    <p 
                        style={{ margin: '15px 0 0 0', color: '#00ccff', textAlign: 'right', fontSize: '0.8em', cursor: 'pointer' }}
                        onClick={handleClearChat}
                    >
                        Limpar conversa
                    </p>
                )}
            </div>

            <div style={inputAreaStyle}>
                <input
                    type="text"
                    placeholder={isLoading ? "Aguarde a resposta..." : "Escreva sua mensagem..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        border: '1px solid #1e3c72',
                        backgroundColor: '#152540',
                        color: 'white',
                        borderRadius: '20px',
                        marginRight: '10px',
                        outline: 'none',
                        fontFamily: 'Montserrat, sans-serif',
                    }}
                />
                <button 
                    style={{ 
                        backgroundColor: (isLoading || !inputText.trim()) ? '#555' : '#00ccff', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        color: 'white',
                        cursor: (isLoading || !inputText.trim()) ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s'
                    }}
                    onClick={() => handleSendMessage(inputText)}
                    disabled={isLoading || !inputText.trim()}
                >
                    {isLoading ? '...' : '➤'}
                </button>
            </div>
        </div>
    );
};

export default ChatbotUI;