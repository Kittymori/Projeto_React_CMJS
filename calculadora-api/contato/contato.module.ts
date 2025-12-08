// contato.module.ts

import { Module } from '@nestjs/common';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ⬅️ Importar ConfigModule e ConfigService

@Module({
  imports: [
    // 1. ConfigModule para carregar o .env
    ConfigModule.forRoot({
      isGlobal: true, // Opcional: torna o ConfigModule acessível globalmente
    }), 

    // 2. MailerModule agora usa useFactory para ler as variáveis
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILTRAP_HOST'), 
          port: configService.get<number>('MAILTRAP_PORT'), 
          auth: {
            user: configService.get<string>('MAILTRAP_USER'), 
            pass: configService.get<string>('MAILTRAP_PASS'), 
          },
        },
        defaults: {
            // Opcional, usa a variável 'MAILTRAP_FROM_ADDRESS'
            from: configService.get<string>('MAILTRAP_FROM_ADDRESS'), 
        },
      }),
      inject: [ConfigService], // Injeta o ConfigService no useFactory
    }),
  ],
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}