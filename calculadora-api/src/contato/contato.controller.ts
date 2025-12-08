// src/contato/contato.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { ContatoDto } from './dto/contato.dto';

@Controller('contato') // ⬅️ Base da rota é 'contato'
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post('enviar') // ⬅️ Rota completa será /contato/enviar
  async enviar(@Body() contatoDto: ContatoDto) {
    await this.contatoService.enviarMensagem(contatoDto);
    return { message: 'Mensagem de contato enviada com sucesso!' };
  }
}