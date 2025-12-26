import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { AddToCartDto, UpdateCartItemDto } from './dtos';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async getOrCreateCart(id_user: number) {
    let cart = await this.prisma.cart.findFirst({
      where: {
        id_user,
        status: 'ACTIVE',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          id_user,
          status: 'ACTIVE',
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  }

  async addItem(id_user: number, addToCartDto: AddToCartDto) {
    const { id_product, quantity } = addToCartDto;

    // Verificar que el producto existe
    const product = await this.productsService.findById(id_product);

    // Verificar stock
    if (product.stock < quantity) {
      throw new BadRequestException('Stock insuficiente');
    }

    // Obtener o crear carrito
    const cart = await this.getOrCreateCart(id_user);

    // Verificar si el producto ya está en el carrito
    let cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id_cart: cart.id_cart,
        id_product,
      },
    });

    if (cartItem) {
      // Actualizar cantidad
      cartItem = await this.prisma.cartItem.update({
        where: { id_cart_item: cartItem.id_cart_item },
        data: {
          quantity: cartItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
    } else {
      // Crear nuevo item
      cartItem = await this.prisma.cartItem.create({
        data: {
          id_cart: cart.id_cart,
          id_product,
          quantity,
          unit_price: parseFloat(product.price.toString()),
        },
        include: {
          product: true,
        },
      });
    }

    return cartItem;
  }

  async updateItem(id_user: number, id_cart_item: number, updateCartItemDto: UpdateCartItemDto) {
    const { quantity } = updateCartItemDto;

    // Obtener el item del carrito
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id_cart_item },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Item del carrito no encontrado');
    }

    // Verificar que el item pertenece al usuario
    if (cartItem.cart.id_user !== id_user) {
      throw new BadRequestException('Este item no pertenece a tu carrito');
    }

    // Verificar stock
    if (quantity && cartItem.product.stock < quantity) {
      throw new BadRequestException('Stock insuficiente');
    }

    // Actualizar
    return this.prisma.cartItem.update({
      where: { id_cart_item },
      data: quantity ? { quantity } : {},
      include: {
        product: true,
      },
    });
  }

  async removeItem(id_user: number, id_cart_item: number) {
    // Obtener el item del carrito
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id_cart_item },
      include: {
        cart: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Item del carrito no encontrado');
    }

    // Verificar que el item pertenece al usuario
    if (cartItem.cart.id_user !== id_user) {
      throw new BadRequestException('Este item no pertenece a tu carrito');
    }

    return this.prisma.cartItem.delete({
      where: { id_cart_item },
    });
  }

  async getCart(id_user: number) {
    const cart = await this.getOrCreateCart(id_user);

    // Calcular total
    let total = 0;
    cart.items.forEach((item) => {
      total += parseFloat(item.unit_price.toString()) * item.quantity;
    });

    return {
      ...cart,
      total: total.toString(),
    };
  }

  async clearCart(id_cart: number, id_user: number) {
    // Verificar que el carrito pertenece al usuario
    const cart = await this.prisma.cart.findUnique({
      where: { id_cart },
    });

    if (!cart || cart.id_user !== id_user) {
      throw new BadRequestException('Este carrito no pertenece a ti');
    }

    // Eliminar todos los items
    await this.prisma.cartItem.deleteMany({
      where: { id_cart },
    });

    return { message: 'Carrito vaciado' };
  }
}
