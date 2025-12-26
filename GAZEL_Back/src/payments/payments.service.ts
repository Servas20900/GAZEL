import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dtos';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async getPaymentByOrder(id_order: number) {
    const payment = await this.prisma.payment.findFirst({
      where: { id_order },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return payment;
  }

  async processPayment(id_order: number, createPaymentDto: CreatePaymentDto) {
    const { payment_method, amount } = createPaymentDto;

    // Verificar que la orden existe
    const order = await this.prisma.order.findUnique({
      where: { id_order },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    // Actualizar el pago
    const payment = await this.prisma.payment.findFirst({
      where: { id_order },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado para esta orden');
    }

    // En un caso real, aquí se integraría con la pasarela de pagos
    // Por ahora, simplemente actualizamos el estado a APPROVED
    const updatedPayment = await this.prisma.payment.update({
      where: { id_payment: payment.id_payment },
      data: {
        payment_method,
        payment_status: 'APPROVED',
        amount: parseFloat(amount),
      },
    });

    // Actualizar estado de la orden
    await this.prisma.order.update({
      where: { id_order },
      data: { status: 'PAID' },
    });

    return updatedPayment;
  }

  async updatePaymentStatus(id_payment: number, status: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id_payment },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return this.prisma.payment.update({
      where: { id_payment },
      data: { payment_status: status as any },
    });
  }
}
