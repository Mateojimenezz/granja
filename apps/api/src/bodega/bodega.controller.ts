import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BodegaService } from './bodega.service';
import { CreateBodegaItemDto } from './bodega.dto';

@Controller('bodega')
@UseGuards(JwtAuthGuard)
export class BodegaController {
  constructor(private readonly bodegaService: BodegaService) {}

  @Get('items')
  list(@Req() req: any) {
    return this.bodegaService.list(req.user.farmId);
  }

  @Post('items')
  create(@Req() req: any, @Body() dto: CreateBodegaItemDto) {
    return this.bodegaService.create(req.user.farmId, dto);
  }
}
