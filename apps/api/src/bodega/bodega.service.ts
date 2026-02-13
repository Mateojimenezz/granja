import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBodegaItemDto } from './bodega.dto';

@Injectable()
export class BodegaService {
  constructor(private readonly prisma: PrismaService) {}

  list(farmId: string) {
    return this.prisma.bodegaItem.findMany({ where: { farmId } });
  }

  create(farmId: string, dto: CreateBodegaItemDto) {
    return this.prisma.bodegaItem.create({ data: { ...dto, farmId } });
  }

  async discountStock(itemId: string, qty: number) {
    if (!itemId || !qty) return;
    await this.prisma.bodegaItem.update({ where: { id: itemId }, data: { stock: { decrement: qty } } });
  }
}
