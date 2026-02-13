import { Module } from '@nestjs/common';
import { GanaderoController } from './ganadero.controller';

@Module({ controllers: [GanaderoController] })
export class GanaderoModule {}
