import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}


  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {

    const existingCategory =
      await this.categoryRepository.findOne({
        where: {
          name: createCategoryDto.name,
        },
      });


    if (existingCategory) {
      throw new ConflictException(
        'La categoría ya existe',
      );
    }


    const category =
      this.categoryRepository.create(
        createCategoryDto,
      );


    return this.categoryRepository.save(
      category,
    );
  }


  async findAll(): Promise<Category[]> {

    return this.categoryRepository.find();

  }


  async findOne(
    id: string,
  ): Promise<Category> {

    const category =
      await this.categoryRepository.findOne({
        where: {
          id,
        },
      });


    if (!category) {
      throw new NotFoundException(
        'Categoría no encontrada',
      );
    }


    return category;
  }


  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {


    const category =
      await this.findOne(id);


    if (
      updateCategoryDto.name &&
      updateCategoryDto.name !== category.name
    ) {

      const existingCategory =
        await this.categoryRepository.findOne({
          where: {
            name: updateCategoryDto.name,
          },
        });


      if (existingCategory) {
        throw new ConflictException(
          'La categoría ya existe',
        );
      }
    }


    await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );


    return this.findOne(id);
  }


  async remove(
    id: string,
  ): Promise<void> {

    const category =
      await this.findOne(id);


    await this.categoryRepository.remove(
      category,
    );
  }

  async findOneOrFail(
    id: string,
  ): Promise<Category> {

    const category =
      await this.categoryRepository.findOne({
        where: {
          id,
        },
      });

    if (!category) {
      throw new NotFoundException(
        'Categoría no encontrada',
      );
    }

    return category;

  }

}