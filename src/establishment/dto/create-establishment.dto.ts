import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEstablishmentDto {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  address: string;

  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  novoCampo: string;
}
