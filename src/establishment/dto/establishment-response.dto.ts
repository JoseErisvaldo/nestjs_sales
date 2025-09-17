import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DateBaseDto } from '../../responseDto/date-base.dto';

export class EstablishmentResponseDto extends DateBaseDto {
  @Expose()
  @IsNotEmpty()
  id!: string;

  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNotEmpty()
  novoCampo!: string;

  @Expose()
  @IsOptional()
  address: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({ obj }) => obj.owner?.id)
  ownerId: string;
}
