import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

    @IsString()
  @IsNotEmpty()
//   @MaxLength()
  password!:string;
}