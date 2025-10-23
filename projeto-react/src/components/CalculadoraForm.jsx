import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ExplicacaoPopup = ({ onClose }) => (
    <div className="bloco-ajuda" style={{ border: '2px solid #00ccff', padding: '15px', margin: '10px 0', textAlign: 'center', backgroundColor: '#05142eff' }}>
        <button 
            onClick={onClose}
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
            X
        </button>
        <h4>Informações de Ajuda:</h4>
        <p><strong>1. Renda Mensal:</strong> "É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas."</p>
        <p><strong>2. Custos Mensais:</strong> "São os gastos mensais necessários para o seu trabalho acontecer, como aluguel da sala, internet, energia, telefone, material de escritório, entre outros. Essas despesas podem ser usadas para reduzir a base de cálculo do imposto (no caso da pessoa física)."</p>
    </div>
);

const CalculadoraForm = ({ onDataSubmit, onOpenChat }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rendaMensal, setRendaMensal] = useState("");
    const [custosMensais, setCustosMensais] = useState("");
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const enviarEmailCheck = watch('enviarEmail', false); 
    const [mensagemSucesso, setMensagemSucesso] = useState(null);
    const handleRendaChange = (e) => setRendaMensal(Number(e.target.value));
    const handleCustosChange = (e) => setCustosMensais(Number(e.target.value));

    const onSubmit = (dados) => {
        setRendaMensal(dados.rendaMensal);
        setCustosMensais(dados.custosMensais);
        onDataSubmit(dados);
        setMensagemSucesso("Dados enviados com sucesso!");
        reset(); 
        setTimeout(() => setMensagemSucesso(null), 5000);
    };

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="calculadora-form">
            <h2>Informações para Comparação</h2>

            {mensagemSucesso && (
                <div>{mensagemSucesso}</div>
            )}

            <div style={{ margin: '10px 0' }}>
                <button type="button" className="btn-ajuda" onClick={togglePopup}>
                    {isPopupOpen ? 'Esconder Ajuda' : 'Mostrar Informações de Ajuda'}
                </button>
            </div>

            {isPopupOpen && (
                <ExplicacaoPopup onClose={togglePopup} /> 
            )}
            
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
                    onChange={handleRendaChange}
                />
                {errors.rendaMensal && <p>{errors.rendaMensal.message}</p>}
            </div>

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
                    onChange={handleCustosChange}
                />
                {errors.custosMensais && <p>{errors.custosMensais.message}</p>}
            </div>

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

            <div className="checkbox-group">
                <input
                    id="enviarEmailCheck"
                    type="checkbox"
                    {...register("enviarEmail")}
                />
                <label htmlFor="enviarEmailCheck">Deseja enviar os cálculos via e-mail?</label>
            </div>

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
                    {errors.emailUsuario && <p>{errors.emailUsuario.message}</p>}
                </div>
            )}

            <button type="submit" className="btn-submit">Calcular Tributação e Enviar</button>

            <hr />

            <div>
                <p>Tem dúvidas sobre tributação ou terminologias? Use nosso Assistente de Dúvidas!</p>
                <button 
                    type="button" 
                    className="btn-chat"
                    onClick={onOpenChat} 
                >
                    Abrir Chatbot de Dúvidas
                </button>
            </div>
            
            <hr /> 
            
            <div>
                <p>Caso prefira, você ainda pode entrar em contato diretamente com o NAF.</p>
                <button 
                    type="button" 
                    className="btn-email-naf"
                    onClick={() => alert("Simulação de Envio de E-mail para o NAF.")}
                >
                    Enviar E-mail para o NAF
                </button>
            </div>
        </form>
    );
};

export default CalculadoraForm;