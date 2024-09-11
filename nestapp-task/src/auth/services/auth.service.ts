import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    const match = await bcrypt.compare(password, user.result.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.result._id,
      email: user.result.email,
    };
    const token = await this.jwtService.signAsync(payload);
    await this.usersService.update(user.result._id, { is_logged_in: true });

    return { message: 'User logged in successfully', token: 'Bearer ' + token };
  }
}
