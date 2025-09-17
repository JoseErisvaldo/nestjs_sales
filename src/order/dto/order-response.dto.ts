import { Expose, Transform } from "class-transformer"
import { IsOptional, IsString, IsNumber, IsDate } from "class-validator"
import { DateBaseDto } from "src/responseDto/date-base.dto"

export class OrderResponseDto extends DateBaseDto {
    @Expose()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    total: number

    @Expose()
    @Transform(({ obj }) => obj.user?.name)
    userName: string;

    @Expose()
    @Transform(({ obj }) => obj.user?.id)
    userId: string;

    @Expose()
    @IsString()
    establishmentId: string

    @Expose()
    @IsString()
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
    paymentMethod: string

    @Expose()
    @IsString()
    @IsOptional()
    observation: string
}
