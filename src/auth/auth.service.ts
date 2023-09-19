import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, Role } from './interface/user.interface';

@Injectable()
export class AuthService {
  users = [
    {
      id: faker.string.uuid(),
      userName: 'Terrace Ratke',
      password: 'terrace',
      role: Role.Admin,
    },
    {
      id: faker.string.uuid(),
      username: 'Samoa Jo',
      password: 'Samoa',
      role: Role.Customer,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.userName &&
        u.password === authenticateDto.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const token = sign({ ...user }, 'secrete');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { token, user };
  }
}
