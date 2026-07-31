import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Instrument } from '../../instruments/entities/instrument.entity';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;


  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @OneToMany(
    () => Instrument,
    (instrument) => instrument.category
  )
  instrument: Instrument[];


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;

}