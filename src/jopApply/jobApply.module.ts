import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { Jobs } from 'src/entities/jobs.entity';

import { Company } from 'src/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { JobSeekerService } from 'src/jobSeeker/job-seeker.service';
import { Exp } from 'src/entities/exp.entity';
import { ExpService } from 'src/exp/exp.service';
import { JobApplyService } from './jobApply.service';
import { JobApplyController } from './jobApply.controller';
import { JobService } from 'src/job/job.service';
import { JobApply } from 'src/entities/jobApply.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JobApply]), TypeOrmModule.forFeature([Jobs]), TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([JobSeeker]), TypeOrmModule.forFeature([Exp])],
    providers: [JobApplyService, JobService, CompanyService, UserService, JobSeekerService, ExpService],
    controllers: [JobApplyController],
    exports: [JobApplyService]
})
export class JobApplyModule { }