import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { Jobs } from 'src/entities/jobs.entity';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Company } from 'src/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { JobSeekerService } from 'src/jobSeeker/job-seeker.service';
import { Exp } from 'src/entities/exp.entity';
import { ExpService } from 'src/exp/exp.service';

@Module({
    imports: [TypeOrmModule.forFeature([Jobs]), TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([JobSeeker]), TypeOrmModule.forFeature([Exp])],
    providers: [JobService, CompanyService, UserService, JobSeekerService, ExpService],
    controllers: [JobController],
    exports: [JobService]
})
export class JobModule { }