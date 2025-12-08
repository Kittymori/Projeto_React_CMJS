import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContatoForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        duvida: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validação do nome
        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        } else if (formData.nome.trim().length < 3) {
            newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
        }

        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validação da dúvida
        if (!formData.duvida.trim()) {
            newErrors.duvida = 'A dúvida é obrigatória';
        } else if (formData.duvida.trim().length < 10) {
            newErrors.duvida = 'A dúvida deve ter pelo menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmissionSuccess(false);
        setErrors({});

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log("Dados de Contato Enviados:", formData);
            setSubmissionSuccess(true);
            
            setFormData({
                nome: '',
                email: '',
                duvida: ''
            });
            
            setTimeout(() => setSubmissionSuccess(false), 5000);

        } catch (error) {
            console.error('Erro ao enviar contato:', error);
            setErrors({ submit: 'Erro ao enviar sua mensagem. Tente novamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };
    
    const inputStyle = (hasError) => ({
        width: '100%',
        padding: '12px',
        border: hasError ? '2px solid #e74c3c' : '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        outline: 'none',
        boxSizing: 'border-box',
        backgroundColor: 'white', 
        
    });

    const focusBlurHandlers = (name, hasError) => ({
        onFocus: (e) => {
            if (!hasError) {
                e.target.style.borderColor = '#667eea'; 
            }
        },
        onBlur: (e) => {
            if (!hasError) {
                e.target.style.borderColor = '#e0e0e0'; 
            }
            validateForm();
        }
    });

    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 20px',
            
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '40px',
                maxWidth: '500px', 
                width: '100%',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600',
                    
                }}>
                    Enviar E-mail p/ NAF
                </h2>

                <form onSubmit={handleSubmit}>
                    
                    {submissionSuccess && (
                        <div style={{
                            backgroundColor: '#D6FFD6',
                            color: '#006400',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            ✅ Sua mensagem foi enviada com sucesso!
                        </div>
                    )}

                    {/* Campo Nome Completo */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontWeight: '500',
                            fontSize: '14px',
                            
                        }}>
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome completo"
                            style={inputStyle(errors.nome)}
                            {...focusBlurHandlers('nome', errors.nome)}
                        />
                        {errors.nome && (
                            <span style={{
                                color: '#e74c3c',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block',
                                
                            }}>
                                {errors.nome}
                            </span>
                        )}
                    </div>

                    {/* Campo Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontWeight: '500',
                            fontSize: '14px',
                            
                        }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seuemail@exemplo.com"
                            style={inputStyle(errors.email)}
                            {...focusBlurHandlers('email', errors.email)}
                        />
                        {errors.email && (
                            <span style={{
                                color: '#e74c3c',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block',
                    
                            }}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Campo Dúvida (Textarea) */}
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontWeight: '500',
                            fontSize: '14px',
                        
                        }}>
                            Sua Dúvida/Mensagem *
                        </label>
                        <textarea
                            name="duvida"
                            value={formData.duvida}
                            onChange={handleChange}
                            placeholder="Descreva sua dúvida ou solicitação..."
                            rows="4"
                            style={inputStyle(errors.duvida)}
                            {...focusBlurHandlers('duvida', errors.duvida)}
                        />
                        {errors.duvida && (
                            <span style={{
                                color: '#e74c3c',
                                fontSize: '12px',
                                marginTop: '5px',
                                display: 'block',
                                
                            }}>
                                {errors.duvida}
                            </span>
                        )}
                    </div>

                    {errors.submit && (
                        <div style={{
                            color: '#e74c3c',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            
                        }}>
                            {errors.submit}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '30px'
                    }}>
                        
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{
                                flex: 1,
                                padding: '14px',
                                border: '2px solid #667eea',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                color: '#667eea',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f8f9fa';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                flex: 1,
                                padding: '14px',
                                border: 'none',
                                borderRadius: '8px',
                                background: isSubmitting
                                    ? '#ccc'
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContatoForm;