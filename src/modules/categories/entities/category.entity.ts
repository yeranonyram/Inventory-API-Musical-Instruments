import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;

}