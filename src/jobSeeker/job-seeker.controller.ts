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
import { JobSeekerService } from './job-seeker.service';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('job-seeker')
export class JobSeekerController {

    constructor(private readonly jobSeekerService: JobSeekerService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getJobSeekers(): Promise<any[]> {
        return this.jobSeekerService.getJobSeekers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getJobSeekerById(@Param() params: any): Promise<any> {
        try {
            return this.jobSeekerService.getJobSeekerById(params.id);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createJobSeeker(@Body() user: JobSeekerDto): Promise<any> {
        return this.jobSeekerService.createJobSeeker(user);
    }



    @UseGuards(JwtAuthGuard)
    @Put()
    async updateJobSeeker(@Body() user: JobSeekerDto): Promise<any> {
        return this.jobSeekerService.updateJobSeeker(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteJobSeeker(@Query() query: any): Promise<any> {
        return this.jobSeekerService.deleteJobSeeker(query.id);
    }

}
