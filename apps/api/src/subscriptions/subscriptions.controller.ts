import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

class UpdateSubscriptionDto {
  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;
}

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('current')
  current(@Req() req: any) {
    return this.prisma.subscription.findFirst({ where: { farmId: req.user.farmId, active: true }, orderBy: { createdAt: 'desc' } });
  }

  @Patch('current')
  async update(@Req() req: any, @Body() dto: UpdateSubscriptionDto) {
    await this.prisma.subscription.updateMany({ where: { farmId: req.user.farmId, active: true }, data: { active: false } });
    return this.prisma.subscription.create({ data: { farmId: req.user.farmId, plan: dto.plan, active: true } });
  }
}
