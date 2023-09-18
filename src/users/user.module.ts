import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { JobSeekerService } from 'src/jobSeeker/job-seeker.service';
import { Company } from 'src/entities/company.entity';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { Exp } from 'src/entities/exp.entity';
import { ExpService } from 'src/exp/exp.service';
import { Jobs } from 'src/entities/jobs.entity';
import { JobService } from 'src/job/job.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([JobSeeker]), TypeOrmModule.forFeature([Exp]), TypeOrmModule.forFeature([Jobs])],
  providers: [UserService, CompanyService, JobSeekerService, ExpService, JobService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
