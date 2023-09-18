import { JobSeeker } from "src/entities/jobSeeker.entity";
import { CompanyDto } from "./company.dto";
import { JobSeekerDto } from "./jobSeeker.dto";
import { Company } from "src/entities/company.entity";

export class UserDto {

    id: string;


    username: string;


    password: string;
    
    telephone: string;


    role: 'company' | 'jobSeeker' | 'admin';


    jobSeeker: JobSeeker;


    company: Company;

}
