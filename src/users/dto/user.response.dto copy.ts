import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DateBaseDto } from "../../responseDto/date-base.dto"

export class UserResponseDto extends DateBaseDto {
  @IsNotEmpty()
  @Expose()
  id: string

  @IsNotEmpty()
  @Expose()
  name: string;
  
  @IsNotEmpty()
  @Expose()
  email: string;l
}
