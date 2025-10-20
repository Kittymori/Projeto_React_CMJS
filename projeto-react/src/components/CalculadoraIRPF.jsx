import React from "react";

const CalculadoraIRPF = ({ rendaMensal, custosMensais }) => {
    const basePF = rendaMensal - custosMensais;
    let imposto = 0;
    let deducao = 0;

    if (basePF <= 2428.80) {
        imposto = 0;
        deducao = 0;
    } else if (basePF >= 2428.81 && basePF <= 2826.65) {
        deducao = 142.80;
        imposto = (basePF * 0.075) - deducao;  
    } else if (basePF >= 2826.66 && basePF <= 3751.05) {
        deducao = 394,16;
        imposto = (basePF * 0.15) - deducao;
    } else if (basePF >= 3751.06 && basePF <= 4664.68) {
        deducao = 675.49;
        imposto = (basePF * 0.225) - deducao;
    } else {
        deducao = 908.73;
        imposto = (basePF * 0.275) - deducao;
    }

    return (
        <div>
            <h2>Calculadora de IRPF</h2>
            <p>Renda Mensal: R$ {rendaMensal.toFixed(2)}</p>
            <p>Custos Mensais: R$ {custosMensais.toFixed(2)}</p>
            <p>Base de Cálculo: R$ {basePF.toFixed(2)}</p>
            <p>Imposto de Renda a Pagar: R$ {imposto.toFixed(2)}</p>
        </div>
    )

}

export default CalculadoraIRPF;
