import { PorcinoPhase } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePorcinoAnimalDto {
  @IsString()
  code!: string;

  @IsString()
  type!: string;

  @IsEnum(PorcinoPhase)
  phase!: PorcinoPhase;

  @IsOptional()
  @IsString()
  lote?: string;
}
