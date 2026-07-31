import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInstrumentDto {

  @ApiProperty({
    example: 'Ibanez RG550',
    description: 'Nombre del instrumento',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'Guitarra eléctrica de 6 cuerdas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    example: 1200,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'UUID de la marca',
  })
  @IsUUID()
  brandId: string;

  @ApiProperty({
    description: 'UUID de la categoría',
  })
  @IsUUID()
  categoryId: string;

}