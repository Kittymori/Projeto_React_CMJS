import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalculoModule } from '../calculo/calculo.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CalculoModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}