import { ExpDto } from "./exp.dto";
import { JobsDto } from "./jobs.dto";

export class JobSeekerDto {

    jobSeekerId: string;


    name: string;


    surname: string;


    title: string;


    telephone: string;


    linkedIn: string;


    email: string;

    // documents: string[];

    location: string;

    about: string;

    languages: string[];

    skills: string[];

    education: ExpDto[];

    experience: ExpDto[];

    appliedJobs: JobsDto[];
}
