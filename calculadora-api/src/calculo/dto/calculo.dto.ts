import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CalculoDto {
  // 1. Dados de Entrada
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  renda: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  custos: number;

  // 2. Outras Propriedades

  @IsNotEmpty()
  @IsString()
  tipoCalculo: string;
}
