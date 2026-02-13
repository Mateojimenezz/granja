import { SetMetadata } from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';

export const MODULES_KEY = 'modules';
export const Modules = (...modules: SubscriptionPlan[]) => SetMetadata(MODULES_KEY, modules);
