import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EnvioEmailDto } from './dto/envio-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('enviar')
  async enviarEmail(@Body() dados: EnvioEmailDto) {
    try {
      const renda = dados.renda || 0;
      const custos = dados.custos || 0;

      await this.emailService.enviar(
        dados.destinatario,
        renda,
        custos,
        dados.tipoCalculo,
      );
      return {
        mensagem:
          'E-mail enviado com sucesso! O cálculo foi realizado no servidor.',
      };
    } catch (error) {
      console.error('Erro no EmailController:', error);
      throw new HttpException(
        'Falha no envio do e-mail: ' + (error || 'Erro desconhecido'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
