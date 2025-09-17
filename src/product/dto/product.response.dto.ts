import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DateBaseDto } from '../../responseDto/date-base.dto';

export class ProductResponseDto extends DateBaseDto {
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @Expose()
  @Transform(({ obj }) => obj.establishment?.id)
  establishmentId: string;

  @IsNotEmpty()
  @Expose()
  @Transform(({ obj }) => obj.establishment?.name)
  establishmentName: string;

  @IsNotEmpty()
  @Expose()
  @Transform(({ obj }) => obj.createdBy?.id)
  createdById: string;

  @IsNotEmpty()
  @Expose()
  @Transform(({ obj }) => obj.createdBy?.name)
  createdByName: string;
}
