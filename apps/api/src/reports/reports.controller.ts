import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('summary')
  async summary(@Req() req: any, @Query('from') from?: string, @Query('to') to?: string) {
    const dateFilter = from && to ? { gte: new Date(from), lte: new Date(to) } : undefined;
    const [events, sales] = await Promise.all([
      this.prisma.porcinoEvent.count({ where: { farmId: req.user.farmId, ...(dateFilter ? { date: dateFilter } : {}) } }),
      this.prisma.sale.aggregate({ _sum: { total: true }, where: { farmId: req.user.farmId, ...(dateFilter ? { date: dateFilter } : {}) } }),
    ]);

    return {
      indicadoresProductivos: { eventosPorcinos: events },
      indicadoresFinancieros: { ventasTotales: sales._sum.total || 0 },
      resumenPorModulo: ['porcino', 'bodega', 'ventas', 'reportes'],
    };
  }
}
