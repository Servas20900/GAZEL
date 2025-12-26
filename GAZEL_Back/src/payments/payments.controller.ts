import { Controller, Post, Get, Put, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  async getPaymentByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentsService.getPaymentByOrder(orderId);
  }

  @Post('order/:orderId/process')
  @UseGuards(JwtAuthGuard)
  async processPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.processPayment(orderId, createPaymentDto);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updatePaymentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentStatusDto: { status: string },
  ) {
    return this.paymentsService.updatePaymentStatus(id, updatePaymentStatusDto.status);
  }
}
