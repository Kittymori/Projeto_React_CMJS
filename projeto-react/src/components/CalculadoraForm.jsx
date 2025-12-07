import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Componente de Ajuda
const ExplicacaoPopup = ({ onClose }) => (
    <div style={{ border: '2px solid #00ccff', padding: '15px', margin: '10px 0', textAlign: 'center', backgroundColor: '#05142eff' }}>
        <button 
            onClick={onClose}
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
            X
        </button>
        <h4>Informações de Ajuda:</h4>
        <p><strong>1. Renda Mensal:</strong> "É o valor total de recursos financeiros que uma pessoa ou família recebe regularmente dentro de um mês, englobando salários, aposentadorias, pensões, aluguéis, rendimentos de investimentos, benefícios sociais e qualquer outra fonte de entrada recorrente; ela representa a soma disponível para custear despesas fixas e variáveis, planejar consumo, poupança ou investimentos, sendo um indicador fundamental da capacidade econômica e do padrão de vida, além de servir como base para cálculos de crédito, impostos e políticas sociais."</p>
        <p><strong>2. Custos Mensais:</strong> "São o conjunto de todas as despesas que uma pessoa ou família precisa arcar dentro de um mês, incluindo gastos fixos como aluguel, financiamento, contas de água, luz, internet e seguros, além de variáveis como alimentação, transporte, lazer, saúde e imprevistos; representam a soma dos compromissos financeiros necessários para manter o padrão de vida e garantir o funcionamento da rotina, sendo fundamentais para o planejamento orçamentário, controle de dívidas e definição da capacidade de poupança ou investimento."</p>
    </div>
);

const CalculadoraForm = ({ onDataSubmit, onOpenChat }) => {
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const enviarEmailCheck = watch('enviarEmail', false); 
    const [mensagemSucesso, setMensagemSucesso] = useState(null);
    const [mostrarMensagemNAF, setMostrarMensagemNAF] = useState(false);
    const [mensagemNAF, setMensagemNAF] = useState('');

    const onSubmit = (dados) => {
        
        const rendaValida = dados.rendaMensal || 0;
        const custosValidos = dados.custosMensais || 0;
        const dadosParaBackend = {
            tipoCalculo: dados.profissao === 'psicologo' ? 'PF' : 'PJ',
            renda: Number(rendaValida), 
            custos: Number(custosValidos),
            emailUsuario: dados.emailUsuario,
            enviarEmail: dados.enviarEmail
        };
        
        // Envia os dados de entrada para handleCalculo no App.jsx
        if (onDataSubmit) {
            onDataSubmit(dadosParaBackend); 
            setMensagemSucesso("✅ Dados enviados para cálculo e comparação.");
            setTimeout(() => setMensagemSucesso(null), 5000);
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="calculadora-form">
            <h2>Informações para Comparação</h2>

            {mensagemSucesso && (
                <div style={{ color: mensagemSucesso.includes('sucesso') ? 'lightgreen' : 'red', fontWeight: 'bold' }}>{mensagemSucesso}</div>
            )}
            
            {/* Seção de Ajuda */}
            <div style={{ margin: '10px 0' }}>
                <button type="button" className="btn-ajuda" onClick={togglePopup}>
                    {isPopupOpen ? 'Esconder Ajuda' : 'Mostrar Informações de Ajuda'}
                </button>
            </div>
            {isPopupOpen && (
                <ExplicacaoPopup onClose={togglePopup} /> 
            )}
            
            {/* Input Renda Mensal */}
            <div>
                <label htmlFor="renda">Renda Mensal (até R$ 15.000): </label>
                <input
                    id="renda"
                    type="number"
                    className="input-field" 
                    {...register("rendaMensal", { 
                        required: "A Renda Mensal é obrigatória.",
                        min: { value: 1, message: "A renda deve ser maior que zero." },
                        max: { value: 15000, message: "A renda não pode exceder R$ 15.000." },
                        valueAsNumber: true,
                    })}
                />
                {errors.rendaMensal && <p style={{color: 'red'}}>{errors.rendaMensal.message}</p>}
            </div>

            {/* Input Custos Mensais */}
            <div>
                <label htmlFor="custos">Total de Custos Mensais: </label>
                <input
                    id="custos"
                    type="number"
                    className="input-field" 
                    {...register("custosMensais", { 
                        required: "Os Custos Mensais são obrigatórios.",
                        min: { value: 0, message: "Os custos não podem ser negativos." },
                        valueAsNumber: true,
                    })}
                />
                {errors.custosMensais && <p style={{color: 'red'}}>{errors.custosMensais.message}</p>}
            </div>

            {/* Select Profissão */}
            <div>
                <label htmlFor="profissao">Profissão:</label>
                <select 
                    id="profissao" 
                    className="input-field" 
                    {...register("profissao", { required: true })} 
                    defaultValue="psicologo"
                >
                    <option value="psicologo">Psicólogo(a)</option>
                </select>
            </div>

            {/* Checkbox Enviar Email */}
            <div className="checkbox-group">
                <input
                    id="enviarEmailCheck"
                    type="checkbox"
                    {...register("enviarEmail")}
                />
                <label htmlFor="enviarEmailCheck">Deseja enviar os cálculos via e-mail?</label>
            </div>

            {/* Input E-mail, condicional */}
            {enviarEmailCheck && (
                <div>
                    <label htmlFor="emailUsuario">Seu E-mail:</label>
                    <input
                        id="emailUsuario"
                        type="email"
                        className="input-field" 
                        {...register("emailUsuario", {
                            required: "O campo de e-mail é obrigatório para o envio.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "E-mail inválido."
                            }
                        })}
                    />
                    {errors.emailUsuario && <p style={{color: 'red'}}>{errors.emailUsuario.message}</p>}
                </div>
            )}

            <button type="submit" className="btn-submit">Calcular Tributação e Enviar</button>

            {/* Mensagem para o NAF*/}
            <div>
                {!mostrarMensagemNAF ? (
                    <p className="btn-ajuda"
                    onClick={() => setMostrarMensagemNAF(true)} 
                    style={{ cursor: 'pointer', marginTop: '20px' }}
                    >
                    Enviar mensagem para o NAF (Núcleo de Apoio Contábil e Fiscal)
                    </p>
                ) : (
                    <div style={{
                    border: '2px solid #00ccff',
                    backgroundColor: '#05142e',
                    padding: '15px',
                    marginTop: '15px',
                    borderRadius: '8px',
                    color: '#ffffff'
                    }}>
                    <textarea
                        value={mensagemNAF}
                        onChange={(e) => setMensagemNAF(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        rows={4}
                        style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #00ccff',
                        backgroundColor: '#0a1a3a',
                        color: '#fff',
                        marginBottom: '10px',
                        resize: 'none',
                        fontFamily: 'Montserrat, sans-serif'
                        }}
                    />

                    <button 
                        type="button" 
                        className="btn-email-naf"
                        disabled={!mensagemNAF.trim()}
                        onClick={() => {
                        alert(`Simulação de envio de e-mail para o NAF:\n\n${mensagemNAF}`);
                        setMensagemNAF('');
                        setMostrarMensagemNAF(false);
                        }}
                    >
                        Enviar E-mail para o NAF
                    </button>
                    </div>
                )}
            </div>
            
        </form>
    );
};

export default CalculadoraForm;