import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async enviarEmail(destinatario: string, resultado: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seuemail@gmail.com',
        pass: 'suasenhaouappkey',
      },
    });

    await transporter.sendMail({
      from: 'Calculadora Tributária <seuemail@gmail.com>',
      to: destinatario,
      subject: 'Resultado da sua simulação',
      text: `Olá! Aqui está o resultado da sua simulação tributária:\n\n${resultado}`,
    });

    return { mensagem: 'E-mail enviado com sucesso!' };
  }
}
