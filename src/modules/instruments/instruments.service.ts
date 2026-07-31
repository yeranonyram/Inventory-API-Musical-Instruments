import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Instrument } from './entities/instrument.entity';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,

    private readonly brandsService: BrandsService,

    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    createInstrumentDto: CreateInstrumentDto,
  ): Promise<Instrument> {
    const existingInstrument =
      await this.instrumentRepository.findOne({
        where: {
          name: createInstrumentDto.name,
        },
      });

    if (existingInstrument) {
      throw new ConflictException(
        'El instrumento ya existe',
      );
    }

    const brand =
      await this.brandsService.findOne(
        createInstrumentDto.brandId,
      );

    const category =
      await this.categoriesService.findOne(
        createInstrumentDto.categoryId,
      );

    const instrument =
      this.instrumentRepository.create({
        name: createInstrumentDto.name,
        description:
          createInstrumentDto.description,
        price: createInstrumentDto.price,
        stock: createInstrumentDto.stock,
        brand,
        category,
      });

    return this.instrumentRepository.save(
      instrument,
    );
  }

  async findAll(): Promise<Instrument[]> {
    return this.instrumentRepository.find();
  }

  async findOne(
    id: string,
  ): Promise<Instrument> {
    const instrument =
      await this.instrumentRepository.findOne({
        where: {
          id,
        },
      });

    if (!instrument) {
      throw new NotFoundException(
        'Instrumento no encontrado',
      );
    }

    return instrument;
  }

  async update(
    id: string,
    updateInstrumentDto: UpdateInstrumentDto,
  ): Promise<Instrument> {
    const instrument =
      await this.findOne(id);

    if (updateInstrumentDto.brandId) {
      instrument.brand =
        await this.brandsService.findOne(
          updateInstrumentDto.brandId,
        );
    }

    if (updateInstrumentDto.categoryId) {
      instrument.category =
        await this.categoriesService.findOne(
          updateInstrumentDto.categoryId,
        );
    }

    if (updateInstrumentDto.name !== undefined) {
      instrument.name =
        updateInstrumentDto.name;
    }

    if (
      updateInstrumentDto.description !==
      undefined
    ) {
      instrument.description =
        updateInstrumentDto.description;
    }

    if (updateInstrumentDto.price !== undefined) {
      instrument.price =
        updateInstrumentDto.price;
    }

    if (updateInstrumentDto.stock !== undefined) {
      instrument.stock =
        updateInstrumentDto.stock;
    }

    return this.instrumentRepository.save(
      instrument,
    );
  }

  async remove(
    id: string,
  ): Promise<void> {
    const instrument =
      await this.findOne(id);

    await this.instrumentRepository.remove(
      instrument,
    );
  }
}