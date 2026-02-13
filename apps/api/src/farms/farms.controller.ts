import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('farms')
@UseGuards(JwtAuthGuard)
export class FarmsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('current')
  current(@Req() req: any) {
    return this.prisma.farm.findUnique({ where: { id: req.user.farmId } });
  }
}
