import { Expose } from 'class-transformer';

export class DateBaseDto {
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
