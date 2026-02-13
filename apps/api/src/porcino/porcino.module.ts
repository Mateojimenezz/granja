import { Module } from '@nestjs/common';
import { PorcinoController } from './porcino.controller';
import { PorcinoService } from './porcino.service';
import { BodegaModule } from '../bodega/bodega.module';

@Module({
  imports: [BodegaModule],
  controllers: [PorcinoController],
  providers: [PorcinoService],
})
export class PorcinoModule {}
