import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('enviar')
  async enviar(@Body() body: { email: string; resultado: string }) {
    return this.emailService.enviarEmail(body.email, body.resultado);
  }
}
