import { Module } from '@nestjs/common';
import { PiscicolaController } from './piscicola.controller';

@Module({ controllers: [PiscicolaController] })
export class PiscicolaModule {}
