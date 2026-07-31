import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Instrument } from './entities/instrument.entity';

import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';

import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instrument,
    ]),
    BrandsModule,
    CategoriesModule,
  ],
  controllers: [
    InstrumentsController,
  ],
  providers: [
    InstrumentsService,
  ],
  exports: [
    InstrumentsService,
  ],
})
export class InstrumentsModule {}