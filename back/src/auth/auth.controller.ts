import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfoDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Primary
  @Post('signUp')
  singIn(@Body() userInfoDTO: UserInfoDTO) {
    return this.authService.signUp(userInfoDTO);
  }

  @Get('logIn')
  logIn(@Body() userInfoDTO: UserInfoDTO) {
    return this.authService.logIn(userInfoDTO);
  }

  // Others
  // @Post()
  // create(@Body() userInfoDTO: UserInfoDTO) {
  //   return this.authService.create(userInfoDTO);
  // }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
