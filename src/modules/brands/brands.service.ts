import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';


@Injectable()
export class BrandsService {

    constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    ) {}


    async create(
    createBrandDto: CreateBrandDto,
    ): Promise<Brand> {

    const existingBrand =
        await this.brandRepository.findOne({
        where: {
            name: createBrandDto.name,
        },
        });


    if (existingBrand) {
        throw new ConflictException(
        'La marca ya existe',
        );
    }


    const brand =
        this.brandRepository.create(
        createBrandDto,
        );


    return this.brandRepository.save(
        brand,
    );
    }


  async findAll(): Promise<Brand[]> {

    return this.brandRepository.find();

  }


    async findOne(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({
        id,
    });

    if (!brand) {
        throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
    }


  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {

    await this.brandRepository.update(
      id,
      updateBrandDto,
    );

    return this.findOne(id);

  }


  async remove(
    id: string,
  ): Promise<void> {

    await this.brandRepository.delete(id);

  }

}