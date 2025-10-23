import React from 'react';

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const containerStyle = { /* ... */ };
const tituloStyle = { /* ... */ };
const cardContainerStyle = { display: 'flex', justifyContent: 'space-around', gap: '20px', marginTop: '30px', };
const cardBaseStyle = { /* ... */ };
const destaqueStyle = (isMelhor) => ({ /* ... */ });


const ResultadoComparacao = ({ dadosEntrada, resultadoPF, resultadoPJ }) => {
    
    const rendaPFLiquida = resultadoPF.rendaMensal - resultadoPF.imposto; 
    const rendaPJLiquida = resultadoPJ.rendaMensal - resultadoPJ.imposto;

    const isPFMelhor = rendaPFLiquida >= rendaPJLiquida;
    
    const CardPF = (
        <div style={destaqueStyle(isPFMelhor)}>
            <h4 style={{ color: isPFMelhor ? '#00ccff' : 'white', borderBottom: '1px solid #1e3c72', paddingBottom: '10px' }}>
                Pessoa Física (PF)
            </h4>
            
            <p><strong>Renda Mensal:</strong> {formatter.format(resultadoPF.rendaMensal)}</p>
            <p><strong>Custos Mensais:</strong> {formatter.format(resultadoPF.custosMensais)}</p>
            <p><strong>Base de Cálculo (IRPF):</strong> {formatter.format(resultadoPF.basePF)}</p>
            <p><strong>IRPF a Pagar:</strong> <strong style={{ color: '#ffeb3b' }}>{formatter.format(resultadoPF.imposto)}</strong></p>
            
            <hr style={{ borderColor: '#1e3c72', margin: '15px 0' }}/>
            <h3 style={{ color: '#00ccff' }}>
                Renda Líquida (Simplificada): {formatter.format(rendaPFLiquida)}
            </h3>
            {isPFMelhor && <p style={{ color: '#ffeb3b', fontWeight: 'bold' }}>&#9733; MELHOR OPÇÃO</p>}
        </div>
    );

    const CardPJ = (
        <div style={destaqueStyle(!isPFMelhor)}>
            <h4 style={{ color: !isPFMelhor ? '#00ccff' : 'white', borderBottom: '1px solid #1e3c72', paddingBottom: '10px' }}>
                Pessoa Jurídica (PJ - Simples Nacional)
            </h4>
            
            <p><strong>Renda Mensal:</strong> {formatter.format(resultadoPJ.rendaMensal)}</p>
            <p><strong>28% da Renda (Pró-Labore):</strong> {formatter.format(resultadoPJ.perce28)}</p>
            <p><strong>Regime:</strong> Simples Nacional (6%)</p>
            <p><strong>Imposto (DAS) a Pagar:</strong> <strong style={{ color: '#ffeb3b' }}>{formatter.format(resultadoPJ.imposto)}</strong></p>
            
            <hr style={{ borderColor: '#1e3c72', margin: '15px 0' }}/>
            <h3 style={{ color: '#00ccff' }}>
                Renda Líquida (Simplificada): {formatter.format(rendaPJLiquida)}
            </h3>
            {!isPFMelhor && <p style={{ color: '#ffeb3b', fontWeight: 'bold' }}>&#9733; MELHOR OPÇÃO</p>}
        </div>
    );


    return (
        <div style={containerStyle}>
            <h2 style={tituloStyle}>Resultado da Simulação e Comparação</h2>
            
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#ccc' }}>
                Renda Bruta Mensal de Entrada: <span style={{ color: '#ffeb3b', fontWeight: 'bold' }}>{formatter.format(dadosEntrada.renda)}</span>
            </p>

            <div style={cardContainerStyle}>
                {CardPF}
                {CardPJ}
            </div>

            <p style={{ marginTop: '40px', fontSize: '0.9em', color: '#ccc', textAlign: 'center' }}>
                *Atenção: Esta é uma simulação inicial. A Renda Líquida não inclui INSS/IRPF sobre Pró-Labore e custos contábeis.
            </p>
        </div>
    );
};

export default ResultadoComparacao;