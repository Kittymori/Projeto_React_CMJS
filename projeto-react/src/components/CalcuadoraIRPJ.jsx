import React from "react";

const CalculadoraIRPJ = ({ rendaMensal }) => {
    
    let simples_nac = rendaMensal * 0.06;
    let pro_labore = rendaMensal * 0.11;
    let perce28 = rendaMensal < 1518.01 ? 1518 : rendaMensal * 0.28;
    let imposto = simples_nac + pro_labore;

    return (
        <>
            <div>
               <h2>Cálculo IRPJ</h2> 
               <p>Renda Mensal: R$: {rendaMensal}</p>
               <p>28% da Renda: R$: {perce28}</p>
               <p>Simples Nacional (6%)</p>
               <p>Immposto a pagar: {imposto}</p>
            </div>
        </>
    )
}

export default CalculadoraIRPJ;