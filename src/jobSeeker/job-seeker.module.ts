import { Module } from '@nestjs/common';
import { JobSeekerService } from './job-seeker.service';
import { JobSeekerController } from './job-seeker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { Exp } from 'src/entities/exp.entity';
import { ExpService } from 'src/exp/exp.service';
import { Jobs } from 'src/entities/jobs.entity';
import { JobService } from 'src/job/job.service';
import { Company } from 'src/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker]), TypeOrmModule.forFeature([Exp]), TypeOrmModule.forFeature([Jobs]), TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([User])],
  providers: [JobSeekerService, ExpService, JobService, CompanyService,UserService],
  controllers: [JobSeekerController],
  exports: [JobSeekerService]
})
export class JobSeekerModule { }
