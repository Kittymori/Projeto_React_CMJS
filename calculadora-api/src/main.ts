import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. CONFIGURAÇÃO CORS OTIMIZADA
    app.enableCors({
        origin: [
            /https:\/\/.*-5173\.app\.github\.dev/, // Aceita qualquer Codespace na porta 5173
            'http://localhost:5173'
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    
    // 2. ATIVAR O VALIDATION PIPE GLOBALMENTE
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    
    await app.listen(3000, () => {
        console.log('NestJS API is running on port 3000');
    });
}
bootstrap();