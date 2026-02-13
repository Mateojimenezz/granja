import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { Modules } from '../common/decorators/modules.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SubscriptionGuard } from '../common/guards/subscription.guard';

@Controller('ganadero')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
@Modules(SubscriptionPlan.GANADERO)
export class GanaderoController {
  @Get('structure')
  structure() {
    return ['animales', 'lotes', 'pesaje', 'vacunacion', 'partos', 'movimientos'];
  }
}
