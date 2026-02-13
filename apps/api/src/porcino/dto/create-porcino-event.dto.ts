import { EventType } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePorcinoEventDto {
  @IsString()
  animalId!: string;

  @IsEnum(EventType)
  type!: EventType;

  @IsDateString()
  date!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  bodegaItemId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  bodegaQuantity?: number;
}
