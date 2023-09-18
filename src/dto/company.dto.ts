import { JobsDto } from "./jobs.dto";

export class CompanyDto {

    companyId: string;


    companyName: string;


    linkedId: string;

    telephone: string;


    owner: string;

    image: string;


    employees: string;


    location: string;


    website: string;


    established: Date;


    about: string;


    jobs: JobsDto[];

}
