import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CONFIGURAÇÃO CORS GLOBAL
  app.enableCors({
    // Permite requisições de QUALQUER origem
    origin: "*",
    
    // Permite TODOS os métodos HTTP (GET, POST, etc.)
    methods: "*",
    
    // Permite TODOS os cabeçalhos (Headers)
    allowedHeaders: "*",
  });
  // ----------------------------------------------------

  await app.listen(3000);
  console.log(`A aplicação está rodando em: ${await app.getUrl()}`);
}
bootstrap();