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
import { JobsDto } from 'src/dto/jobs.dto';
import { CompanyService } from 'src/company/company.service';
import { JobApplyService } from './jobApply.service';
import { JobApply } from 'src/entities/jobApply.entity';
import { JobService } from 'src/job/job.service';
import { JobSeekerService } from 'src/jobSeeker/job-seeker.service';

@Controller('job-apply')
export class JobApplyController {

    constructor(private readonly jobApplyService: JobApplyService, private jobService: JobService, private jobSeekerService: JobSeekerService, private companyService: CompanyService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getJobApplys(): Promise<any[]> {
        return this.jobApplyService.getJobApplys();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/entity")
    async getApplyById(@Query() query: any): Promise<any> {
        try {
            const companyId = query?.companyId;
            const jobSeekerId = query?.jobSeekerId;
            const jobId = query?.jobId;

            return this.jobApplyService.getApplyById(companyId, jobSeekerId, jobId);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('/seen')
    async setSeen( @Query() query: any): Promise<any> {
        const jobSeekerId = query?.jobSeekerId;
        const companyId = query?.companyId;

        return this.jobApplyService.setSeen(companyId, jobSeekerId)
  
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createApply(@Body() body: JobApply, @Req() req: any, @Query() query: any): Promise<any> {
        const jobSeekerId = String(req.user.jobSeeker.jobSeekerId);
        const jobId = query.jobId;
        const job = await this.jobService.getJobById(jobId);
        const jobSeeker = await this.jobSeekerService.getJobSeekerById(jobSeekerId);
        const companyId = job.companyId;
        const company = await this.companyService.getCompanyById(companyId);

        await this.jobSeekerService.applyJob(jobId, jobSeekerId);

        body.company = company;
        body.jobSeeker = jobSeeker;
        body.job = job;


        return this.jobApplyService.createJobApply(body);
    }


    @UseGuards(JwtAuthGuard)
    @Put()
    async updateJobApply(@Body() jobApplyObj: any): Promise<any> {
        return this.jobApplyService.updateJobApply(jobApplyObj);
    }

    // @UseGuards(JwtAuthGuard)
    // @Delete()
    // async deleteJob(@Query() query: any): Promise<any> {
    //     return this.jobApplyService.deleteJob(query.id);
    // }

}
