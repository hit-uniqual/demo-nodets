import {
  IsNotEmpty,
  IsEmail,
  Validate,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check/lib'

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
}

export class ChangePasswordUserDto {
  @IsNotEmpty()
  public oldPassword: string

  @Validate(PasswordValidation, [passwordRequirement])
  @MaxLength(20)
  @MinLength(5)
  @IsNotEmpty()
  public password: string

  @IsNotEmpty()
  public confirmedPassword: string
}
