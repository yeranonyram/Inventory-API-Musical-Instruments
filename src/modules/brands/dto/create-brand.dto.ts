import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBrandDto {

  @ApiProperty({
    example: 'Ibanez',
    description: 'Nombre de la marca',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;


  @ApiProperty({
    example: 'Fabricante japonés de instrumentos musicales',
    description: 'Descripción de la marca',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

}