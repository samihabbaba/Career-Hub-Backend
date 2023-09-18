import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { ExpService } from 'src/exp/exp.service';
import { JobService } from 'src/job/job.service';
import { Repository } from 'typeorm';

@Injectable()
export class JobSeekerService {

    constructor(@InjectRepository(JobSeeker)
    private jobSeekerRepository: Repository<JobSeeker>, private expService: ExpService, private jobService: JobService) {
    }


    async getJobSeekers(): Promise<JobSeeker[]> {
        return this.jobSeekerRepository.find();
    }


    async getJobSeekerById(jobSeekerId: string): Promise<JobSeeker> {
        // try {
        //   const user = await this.usersRepository.findOne({ where: { id } });
        //   return user;
        // } catch (err) {
        //   return err;
        // }
        const jobSeeker = await this.jobSeekerRepository.findOne({ where: { jobSeekerId }, relations: ['experience', 'education', 'appliedJobs', 'image'] });
        // const jobSeeker = await this.jobSeekerRepository.findBy({  jobSeekerId  });

        // here
        // jobSeeker.appliedJobs = jobSeeker.appliedJobs || [];


        return jobSeeker;
    }


    async createJobSeeker(jobSeeker: any): Promise<any> {
        const newJobSeeker = this.jobSeekerRepository.create(jobSeeker);

        return this.jobSeekerRepository.save(newJobSeeker);
    }


    async updateJobSeeker(user: any): Promise<JobSeeker> {
        let selectedUser = await this.getJobSeekerById(String(user.jobSeekerId));
        selectedUser = user;
        return this.jobSeekerRepository.save(selectedUser);
    }



    async deleteJobSeeker(id: string): Promise<JobSeeker> {

        const user = await this.getJobSeekerById(id);
        return this.jobSeekerRepository.remove(user);
    }


    async applyJob(jobId: string, jobSeekerId: string): Promise<any> {
        const job = await this.jobService.getJobById(jobId);

        const jobSeeker = await this.getJobSeekerById(jobSeekerId);

        jobSeeker.appliedJobs.push(job)

        return this.jobSeekerRepository.save(jobSeeker);

    }



}
