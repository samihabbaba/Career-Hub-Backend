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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobService } from './job.service';
import { JobsDto } from 'src/dto/jobs.dto';
import { CompanyService } from 'src/company/company.service';

@Controller('job')
export class JobController {

    constructor(private readonly jobService: JobService, private companyService: CompanyService) { }


    // @UseGuards(JwtAuthGuard)
    @Get()
    async getJobs(): Promise<any[]> {
        return this.jobService.getJobs();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getJobById(@Param() params: any): Promise<any> {
        try {
            return this.jobService.getJobById(params.id);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createJob(@Body() user: JobsDto, @Req() req: any): Promise<any> {
        const newJob = await this.jobService.createJob(user);

        let selectedCompany = await this.companyService.getCompanyById(String(req.user.company.companyId));

        // here
        selectedCompany.jobs.push(newJob);

        // console.log(selectedCompany)

        await this.companyService.saveCompany(selectedCompany);


        return newJob;
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateJob(@Body() user: JobsDto): Promise<any> {
        return this.jobService.updateJob(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteJob(@Query() query: any): Promise<any> {
        return this.jobService.deleteJob(query.id);
    }

}
