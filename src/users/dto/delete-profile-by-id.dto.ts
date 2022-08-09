import { IsNotEmpty } from 'class-validator'

export class DeleteProfileByIdDto {
  @IsNotEmpty()
  public id: number
}
