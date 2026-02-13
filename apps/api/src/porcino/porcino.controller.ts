import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SubscriptionGuard } from '../common/guards/subscription.guard';
import { Modules } from '../common/decorators/modules.decorator';
import { PorcinoService } from './porcino.service';
import { CreatePorcinoAnimalDto } from './dto/create-porcino-animal.dto';
import { CreatePorcinoEventDto } from './dto/create-porcino-event.dto';

@Controller('porcino')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
@Modules(SubscriptionPlan.PORCINO)
export class PorcinoController {
  constructor(private readonly porcinoService: PorcinoService) {}

  @Get('animals')
  animals(@Req() req: any) {
    return this.porcinoService.listAnimals(req.user.farmId);
  }

  @Post('animals')
  createAnimal(@Req() req: any, @Body() dto: CreatePorcinoAnimalDto) {
    return this.porcinoService.createAnimal(req.user.farmId, dto);
  }

  @Get('events')
  events(@Req() req: any) {
    return this.porcinoService.listEvents(req.user.farmId);
  }

  @Post('events')
  createEvent(@Req() req: any, @Body() dto: CreatePorcinoEventDto) {
    return this.porcinoService.createEvent(req.user.farmId, req.user.userId, dto);
  }

  @Get('metrics')
  metrics(@Req() req: any) {
    return this.porcinoService.metrics(req.user.farmId);
  }
}
