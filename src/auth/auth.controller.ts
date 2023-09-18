import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async login(@Body() body) {
        return this.authService.login(body);
    }

}
