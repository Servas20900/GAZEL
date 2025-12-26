import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dtos';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: ProductFilterDto) {
    const where: any = {};

    if (filters?.id_category) {
      where.id_category = filters.id_category;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id_product: id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async findByCategory(id_category: number) {
    return this.prisma.product.findMany({
      where: {
        id_category,
        status: 'ACTIVE',
      },
      include: {
        category: true,
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    // Verificar que la categoría existe
    const category = await this.prisma.category.findUnique({
      where: { id_category: createProductDto.id_category },
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: parseFloat(createProductDto.price),
        stock: createProductDto.stock || 0,
        image_url: createProductDto.image_url,
        id_category: createProductDto.id_category,
      },
      include: {
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar que el producto existe
    await this.findById(id);

    // Si se actualiza la categoría, verificar que existe
    if (updateProductDto.id_category) {
      const category = await this.prisma.category.findUnique({
        where: { id_category: updateProductDto.id_category },
      });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
    }

    const data: any = { ...updateProductDto };
    if (data.price) {
      data.price = parseFloat(data.price);
    }

    return this.prisma.product.update({
      where: { id_product: id },
      data,
      include: {
        category: true,
      },
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return this.prisma.product.delete({
      where: { id_product: id },
    });
  }
}
