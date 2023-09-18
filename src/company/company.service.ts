import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {


    constructor(@InjectRepository(Company)
    private companyRepository: Repository<Company>,) {
    }


    async getCompanies(): Promise<Company[]> {
        return this.companyRepository.find();
    }


    async getCompanyById(companyId: string): Promise<Company> {
        // try {
        //   const user = await this.usersRepository.findOne({ where: { id } });
        //   return user;
        // } catch (err) {
        //   return err;
        // }
        const company = await this.companyRepository.findOne({ where: { companyId }, relations: ['jobs', 'image'] });
        // here
        // company.jobs = company.jobs || [];
        return company;
    }


    async createCompany(company: any): Promise<any> {
        const newCompany = this.companyRepository.create(company);
        return this.companyRepository.save(newCompany);
    }


    async updateCompany(user: any): Promise<Company> {
        let selectedUser = await this.getCompanyById(String(user.companyId));
        selectedUser = user;
        return this.companyRepository.save(selectedUser);
    }



    async deleteCompany(id: string): Promise<Company> {
        const user = await this.getCompanyById(id);
        return this.companyRepository.remove(user);
    }

    async saveCompany(company) {
        return this.companyRepository.save(company);
    }
}
