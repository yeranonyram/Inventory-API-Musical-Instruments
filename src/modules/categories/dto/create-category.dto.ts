import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';


export class CreateCategoryDto {

  @ApiProperty({
    example: 'Cuerdas',
    description: 'Nombre de la categoría',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;


  @ApiProperty({
    example: 'Instrumentos de cuerda como guitarras y violines',
    description: 'Descripción de la categoría',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

}