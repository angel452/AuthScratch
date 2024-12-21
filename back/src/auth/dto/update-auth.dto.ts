import { PartialType } from '@nestjs/mapped-types';
import { UserInfoDTO } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(UserInfoDTO) {}
