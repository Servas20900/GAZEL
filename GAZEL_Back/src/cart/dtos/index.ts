import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsNumber()
  id_product!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}
