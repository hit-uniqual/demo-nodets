import { IsNotEmpty, IsEmail, IsInt } from 'class-validator'

export class ForgotPasswordVerifyOtpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsInt()
  public otp: number
}
