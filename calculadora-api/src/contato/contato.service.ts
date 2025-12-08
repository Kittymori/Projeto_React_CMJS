import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContatoDto } from './dto/contato.dto';

@Injectable()
export class ContatoService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarMensagem(contatoDto: ContatoDto): Promise<void> {
    const { nome, email, duvida } = contatoDto;
    const destinatarioNaf = 'naf_unichristus@edu.com'; 

    await this.mailerService.sendMail({
      to: destinatarioNaf, 
      from: 'Calculadora Tributária <naf_unichristus@edu.com>',
      replyTo: email,
      subject: `Nova Mensagem - ${nome}`,
      
      html: `
        <h2>Nova Mensagem Recebida</h2>
        <p>Prezado NAF,</p>
        <p>Você recebeu uma nova mensagem de contato através da Calculadora Tributária.</p>
        
        <hr>
        
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Dúvida:</strong></p>
        <div style="border: 1px solid #ccc; padding: 15px; background-color: #f9f9f9;">
          ${duvida.replace(/\n/g, '<br>')}
        </div>
        
        <hr>
        
        <p>Obrigado,<br>Sistema de Notificação.</p>
      `,
    });

    console.log(`Mensagem de contato de ${nome} enviada para ${destinatarioNaf} com sucesso.`);
  }
}