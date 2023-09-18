import { JobSeekerDto } from "./jobSeeker.dto";

export class JobsDto {

    jobId: string;


    title: string;


    experience: "0-3" | '3-5' | "5+";


    location: string;


    salary: string;


    qualification: string;


    industry: string;


    createdAt: Date;


    companyId: string;


    position: string;


    employeeType: string;


    jobDescription: string;


    responsibilities: string[];


    requirements: string[];


    skills: string[];


    applicants: JobSeekerDto[];


    category: string;

}