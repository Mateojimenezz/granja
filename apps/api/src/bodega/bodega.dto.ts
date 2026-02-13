import { BodegaCategory } from '@prisma/client';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export class CreateBodegaItemDto {
  @IsString()
  name!: string;

  @IsEnum(BodegaCategory)
  category!: BodegaCategory;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsString()
  unit!: string;
}
