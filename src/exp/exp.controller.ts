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
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExpService } from './exp.service';
import { ExpDto } from 'src/dto/exp.dto';

@Controller('exp')
export class ExpController {

    constructor(private readonly expService: ExpService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getExps(): Promise<any[]> {
        return this.expService.getExps();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getExpById(@Param() params: any): Promise<any> {
        try {
            return this.expService.getExpById(params.id);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createExp(@Body() user: ExpDto): Promise<any> {
        return this.expService.createExp(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateExp(@Body() user: ExpDto): Promise<any> {
        return this.expService.updateExp(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteExp(@Query() query: any): Promise<any> {
        return this.expService.deleteExp(query.id);
    }

}
