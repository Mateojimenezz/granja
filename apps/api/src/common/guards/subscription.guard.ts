import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SubscriptionPlan } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { MODULES_KEY } from '../decorators/modules.decorator';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<SubscriptionPlan[]>(MODULES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required?.length) return true;

    const req = context.switchToHttp().getRequest();
    const farmId = req.user?.farmId;
    if (!farmId) return false;

    const subscription = await this.prisma.subscription.findFirst({
      where: { farmId, active: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!subscription) return false;

    if (subscription.plan === 'EMPRESARIAL' || subscription.plan === 'COMBO') return true;
    return required.includes(subscription.plan);
  }
}
