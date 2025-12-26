import { Controller, Get, Post, Put, Delete, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dtos';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@GetUser('id_user') id_user: number) {
    return this.cartService.getCart(id_user);
  }

  @Post('items')
  async addItem(@GetUser('id_user') id_user: number, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItem(id_user, addToCartDto);
  }

  @Put('items/:itemId')
  async updateItem(
    @GetUser('id_user') id_user: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(id_user, itemId, updateCartItemDto);
  }

  @Delete('items/:itemId')
  async removeItem(
    @GetUser('id_user') id_user: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItem(id_user, itemId);
  }

  @Delete(':cartId/clear')
  async clearCart(
    @GetUser('id_user') id_user: number,
    @Param('cartId', ParseIntPipe) cartId: number,
  ) {
    return this.cartService.clearCart(cartId, id_user);
  }
}
