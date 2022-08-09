import { IsNotEmpty } from 'class-validator'

export class EditProfileByIdDto {
  @IsNotEmpty()
  public id: number
}
