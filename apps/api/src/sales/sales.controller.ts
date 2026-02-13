import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

class CreateSaleDto {
  @IsString()
  module!: string;
  @IsOptional()
  @IsString()
  referenceId?: string;
  @IsInt()
  quantity!: number;
  @IsNumber()
  unitPrice!: number;
}

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@Req() req: any) {
    return this.prisma.sale.findMany({ where: { farmId: req.user.farmId }, orderBy: { date: 'desc' } });
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateSaleDto) {
    return this.prisma.sale.create({ data: { ...dto, total: dto.quantity * dto.unitPrice, farmId: req.user.farmId } });
  }
}
