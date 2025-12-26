import { IsNotEmpty, IsEnum, IsDecimal, IsOptional } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
  @IsNotEmpty()
  payment_method!: PaymentMethod;

  @IsNotEmpty()
  @IsDecimal()
  amount!: string;

  @IsOptional()
  payment_reference?: string;
}
