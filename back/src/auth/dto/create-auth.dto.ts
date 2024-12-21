import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserInfoDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
