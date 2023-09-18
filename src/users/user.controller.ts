import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SMSAPI } from 'smsapi';


const smsapi = new SMSAPI('OR53QPANBrPohhFtabEDmxD2MrgARzsMwnos6i7g');

@Controller('user')
export class UserController {

    constructor(private readonly usersService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(): Promise<UserDto[]> {
        return this.usersService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param() params: any): Promise<UserDto> {
        try {
            return this.usersService.getUserById(params.id);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }

    @Post()
    async createUser(@Body() user: UserDto): Promise<UserDto> {
        return this.usersService.createUser(user);
    }

    @Post('/sms')
    async sendSms(@Body() body): Promise<any> {
        return smsapi.sms.sendSms(body.telephone, body.message);
    }

    // @UseGuards(JwtAuthGuard)
    // @Put()
    // async updateUser(@Body() user: UserDto): Promise<UserDto> {
    //     return this.usersService.updateUser(user);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Query() query: any): Promise<UserDto> {
        return this.usersService.deleteUser(query.id);
    }
}
