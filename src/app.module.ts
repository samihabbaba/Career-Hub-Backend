import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { JobSeeker } from './entities/jobSeeker.entity';
import { Exp } from './entities/exp.entity';
import { Company } from './entities/company.entity';
import { Jobs } from './entities/jobs.entity';
import { UserModule } from './users/user.module';
import { JobSeekerModule } from './jobSeeker/job-seeker.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ExpModule } from './exp/exp.module';
import { FileEntity } from './entities/file.entity';
import { FileModule } from './file/file.module';
import { JobApply } from './entities/jobApply.entity';
import { JobApplyModule } from './jopApply/jobApply.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [User, JobSeeker, Exp, Company, Jobs, FileEntity, JobApply],
      synchronize: true,
    }),
    
    UserModule,
    JobSeekerModule,
    CompanyModule,
    JobModule,
    ExpModule,
    AuthModule,
    FileModule,
    JobApplyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
