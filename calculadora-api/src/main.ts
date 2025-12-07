import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
          'https://improved-waffle-pjgv7xrv6rgxhr7vp-5173.app.github.dev',
          'http://localhost:5173'
      ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3000); 
}
bootstrap();