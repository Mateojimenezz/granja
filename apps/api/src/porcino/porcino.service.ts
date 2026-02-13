import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BodegaService } from '../bodega/bodega.service';
import { CreatePorcinoAnimalDto } from './dto/create-porcino-animal.dto';
import { CreatePorcinoEventDto } from './dto/create-porcino-event.dto';

@Injectable()
export class PorcinoService {
  constructor(private readonly prisma: PrismaService, private readonly bodegaService: BodegaService) {}

  createAnimal(farmId: string, dto: CreatePorcinoAnimalDto) {
    return this.prisma.porcinoAnimal.create({ data: { ...dto, farmId } });
  }

  listAnimals(farmId: string) {
    return this.prisma.porcinoAnimal.findMany({ where: { farmId }, orderBy: { createdAt: 'desc' } });
  }

  async createEvent(farmId: string, userId: string, dto: CreatePorcinoEventDto) {
    const event = await this.prisma.porcinoEvent.create({
      data: {
        farmId,
        userId,
        animalId: dto.animalId,
        type: dto.type,
        date: new Date(dto.date),
        location: dto.location,
        notes: dto.notes,
        bodegaItemId: dto.bodegaItemId,
        bodegaQuantity: dto.bodegaQuantity,
      },
    });

    if (dto.bodegaItemId && dto.bodegaQuantity) {
      await this.bodegaService.discountStock(dto.bodegaItemId, dto.bodegaQuantity);
    }

    return event;
  }

  listEvents(farmId: string) {
    return this.prisma.porcinoEvent.findMany({
      where: { farmId },
      include: { animal: true, user: { select: { fullName: true, email: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async metrics(farmId: string) {
    const totalAnimales = await this.prisma.porcinoAnimal.count({ where: { farmId } });
    const totalEventos = await this.prisma.porcinoEvent.count({ where: { farmId } });
    const partos = await this.prisma.porcinoEvent.count({ where: { farmId, type: 'PARTO' } });
    return { totalAnimales, totalEventos, partos };
  }
}
