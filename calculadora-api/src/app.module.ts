import { Module } from '@nestjs/common';
import { SendEmailModule } from './integration/send-email/send-email.module';
import { UserModule } from './user/user.module';
import { DbModule } from './integration/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CalculoModule } from './calculo/calculo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SendEmailModule,
    UserModule,
    DbModule,
    AuthModule,
    CalculoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Guard global - todas rotas protegidas por padrão
    },
  ],
})
export class AppModule {}
