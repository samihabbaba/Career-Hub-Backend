import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule { }
