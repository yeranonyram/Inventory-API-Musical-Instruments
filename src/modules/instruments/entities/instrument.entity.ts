import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('instruments')
export class Instrument {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  stock: number;

  @ManyToOne(
    () => Brand,
    {
      eager: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @ManyToOne(
    () => Category,
    {
      eager: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}