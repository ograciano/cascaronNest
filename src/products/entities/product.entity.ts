import { ProductImage } from './';
import { User } from '../../auth/entities/users.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '12c9d6f4-5090-4829-9b3b-de0fc7df065b',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: "Men's Raven Lightweight Zip Up Bomber Jacket",
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 130,
    description: 'Product Price',
    type: 'float',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example:
      "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
    description: 'Product Desription',
    nullable: true,
    type: 'string',
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'men_raven_lightweight_zip_up_bomber_jacket',
    description: 'Product slug',
    type: 'string',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    type: 'Int',
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: '["S", "M", "L", "XL", "XXL"]',
    description: 'Product Sizes',
    type: 'Array',
    isArray: true,
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'woman',
    description: 'Product Gender',
    type: 'string',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: '["shirt"]',
    description: 'Product Tags',
    type: 'Array',
    isArray: true,
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ' ["1740250-00-A_0_2000.jpg", "1740250-00-A_1.jpg"]',
    description: 'Priducts Images',
    type: 'Array',
    isArray: true,
  })
  @OneToMany(() => ProductImage, (producImage) => producImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) this.slug = this.title;
    this.slug = this.formatSlug(this.slug);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.formatSlug(this.slug);
  }

  formatSlug(slug: string) {
    return (slug = slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", ''));
  }
}
