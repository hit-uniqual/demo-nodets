import { IsNotEmpty } from 'class-validator'

export class GetProfileByIdDto {
  @IsNotEmpty()
  public id: number
}
