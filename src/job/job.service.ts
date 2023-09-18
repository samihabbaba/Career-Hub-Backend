import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Jobs } from 'src/entities/jobs.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class JobService {

    constructor(@InjectRepository(Jobs)
    private jobRepository: Repository<Jobs>) {
    }


    async getJobs(): Promise<Jobs[]> {
        const today = new Date();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(today.getMonth() - 1);
        return this.jobRepository.find({ relations: ['company', 'company.image'], where: { createdAt: MoreThan(twoMonthsAgo), isHired: false } });

        // const today = new Date();
        // const twoMonthsAgo = new Date();
        // twoMonthsAgo.setMonth(today.getMonth() - 2);
        // return this.jobRepository.createQueryBuilder('job').leftJoinAndSelect('job.company', 'company').leftJoinAndSelect('company.image', 'image').where('job.createdAt > :twoMonthsAgo', { twoMonthsAgo } ).getMany();
    }


    async getJobById(jobId: string): Promise<Jobs> {
        // try {
        //   const user = await this.usersRepository.findOne({ where: { id } });
        //   return user;
        // } catch (err) {
        //   return err;
        // }
        const job = await this.jobRepository.findOne({ where: { jobId }, relations: ['applicants', 'company', 'company.image'] });
        return job;
    }


    async createJob(job: any): Promise<any> {
        const newJob = this.jobRepository.create(job);

        return this.jobRepository.save(newJob);
    }


    async updateJob(user: any): Promise<Jobs> {
        let selectedUser = await this.getJobById(user.jobId);
        // selectedUser = user;
        const mergedObj = Object.assign({}, selectedUser, user);
        return this.jobRepository.save(mergedObj);
    }



    async deleteJob(id: string): Promise<Jobs> {
        const user = await this.getJobById(id);
        return this.jobRepository.remove(user);
    }


}
