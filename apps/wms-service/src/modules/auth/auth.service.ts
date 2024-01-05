import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { username, password }: SignInDto = signInDto;
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password, confirmPassword }: RegisterDto = registerDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Password does not match confirm password');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    await this.usersService.create({ username: username, password: hash });
  }
}
