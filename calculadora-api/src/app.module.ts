import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalculoModule } from './calculo/calculo.module';
import { EmailModule } from './email/email.module';
import { ContatoModule } from './contato/contato.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CalculoModule,
    EmailModule,
    ContatoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}