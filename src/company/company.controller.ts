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
import { CompanyService } from './company.service';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Company } from 'src/entities/company.entity';
import { CompanyDto } from 'src/dto/company.dto';

@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getCompanies(): Promise<any[]> {
        return this.companyService.getCompanies();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCompanyById(@Param() params: any): Promise<any> {
        try {
            return this.companyService.getCompanyById(params.id);
        } catch {
            throw new HttpException('No users found.', HttpStatus.NO_CONTENT);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCompany(@Body() user: Company): Promise<any> {
        return this.companyService.createCompany(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateCompany(@Body() user: any): Promise<any> {
        return this.companyService.updateCompany(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteCompany(@Query() query: any): Promise<any> {
        return this.companyService.deleteCompany(query.id);
    }

}
