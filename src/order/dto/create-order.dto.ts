import { Expose } from "class-transformer"
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate } from "class-validator"

export class CreateOrderDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    total: number
    
    @Expose()
    @IsString()
    @IsNotEmpty()
    userId: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    establishmentId: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    status: string

    @Expose()
    @IsDate()
    @IsOptional()
    canceledAt: Date

    @Expose()
    @IsString()
    @IsOptional()
    reasonCanceled: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    paymentMethod: string

    @Expose()
    @IsString()
    @IsOptional()
    observation: string
}
