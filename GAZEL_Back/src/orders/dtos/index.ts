import { IsNotEmpty, IsString, IsOptional, IsEnum, IsEmail, IsNumber, IsDecimal, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ShippingMethod, PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  id_cart!: number;

  @IsNotEmpty()
  @IsString()
  full_name!: string;

  @IsOptional()
  @IsString()
  identification?: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  province!: string;

  @IsNotEmpty()
  @IsString()
  canton!: string;

  @IsNotEmpty()
  @IsString()
  district!: string;

  @IsNotEmpty()
  @IsString()
  address_details!: string;

  @IsOptional()
  @IsString()
  delivery_notes?: string;

  @IsNotEmpty()
  @IsEnum(ShippingMethod)
  shipping_method!: ShippingMethod;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method!: PaymentMethod;

  @IsNotEmpty()
  @IsDecimal()
  total_amount!: string;
}

export class GuestOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  id_product!: number;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  unit_price!: number;
}

export class CreateGuestOrderDto {
  @IsNotEmpty()
  @IsString()
  full_name!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GuestOrderItemDto)
  items!: GuestOrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  total_amount!: number;

  @IsOptional()
  @IsEnum(PaymentMethod)
  payment_method?: PaymentMethod;
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  status!: string;
}
