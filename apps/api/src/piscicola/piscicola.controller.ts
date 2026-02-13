import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { Modules } from '../common/decorators/modules.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SubscriptionGuard } from '../common/guards/subscription.guard';

@Controller('piscicola')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
@Modules(SubscriptionPlan.PISCICOLA)
export class PiscicolaController {
  @Get('structure')
  structure() {
    return ['estanques', 'lotes', 'siembra', 'mortalidad', 'alimentacion', 'cosecha'];
  }
}
