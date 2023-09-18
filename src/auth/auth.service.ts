import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
      ) {}
    
      async validateUser(username: string, password: string): Promise<any> {
        return await this.usersService.validateUser(username, password);
      }
    
      async login(user: User) {
        const currentUser = await this.usersService.validateUser(user.username, user.password);
        const payload = currentUser;
        
        return {
          access_token: this.jwtService.sign(payload),
          ...currentUser,
          password: 'you shall not see :)'
        };
      }
}
