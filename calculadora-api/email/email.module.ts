import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      // CONFIGURAÇÃO MAILTRAP SANDBOX
      transport: {
        host: 'sandbox.smtp.mailtrap.io', // Host do Mailtrap Sandbox
        port: 2525,
        secure: false,
        auth: {
          user: '25163e3dd0793c8', 
          pass: '672a139abc0ad4', 
        },
      },
      // Configuração Padrão do Remetente
      defaults: {
        from: '"Calculadora Tributária" <noreply@seuapp.com>',
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  // Essencial para que outros módulos possam usar o EmailService
  exports: [EmailService],
})
export class EmailModule {}