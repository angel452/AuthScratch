import { compare } from './../libs/bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserInfoDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encrypt } from 'src/libs/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async returnToken(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithOutPassword } = user;

    // [+] New Object withouth password for security
    const payload = {
      ...userWithOutPassword,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async signUp(userInfoDTO: UserInfoDTO) {
    try {
      // Buscar si el usuario ya existe
      const userFound = await this.prismaService.user.findUnique({
        where: {
          email: userInfoDTO.email,
        },
      });

      if (userFound) {
        throw new BadRequestException('User already exists');
      }

      // Crear el usuario
      const hashedPassword = await encrypt(userInfoDTO.password);
      const user = await this.prismaService.user.create({
        data: {
          email: userInfoDTO.email,
          password: hashedPassword,
        },
      });

      // Return token
      const access_token = await this.returnToken(user);

      return {
        access_token,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async logIn(userInfoDto: UserInfoDTO) {
    try {
      // Buscamos el usuario
      const user = await this.prismaService.user.findUnique({
        where: {
          email: userInfoDto.email,
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      // Comparamos las contraseñas
      const matchPassword = await compare(userInfoDto.password, user.password);

      if (!matchPassword) {
        throw new BadRequestException('Invalid credentials');
      }

      // Return token
      const access_token = await this.returnToken(user);

      return {
        access_token,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error with the server/Login');
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  // create(userInfoDTO: UserInfoDTO) {
  //   return 'This action adds a new auth';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
