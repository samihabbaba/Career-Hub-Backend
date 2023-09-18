import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { JobApply } from 'src/entities/jobApply.entity';
import { JobService } from 'src/job/job.service';
import { Repository } from 'typeorm';

@Injectable()
export class JobApplyService {

    constructor(@InjectRepository(JobApply)
    private jobApplyRepository: Repository<JobApply>, private jobService: JobService) {
    }


    async getJobApplys(): Promise<JobApply[]> {
        return this.jobApplyRepository.find({ relations: ['documents', 'company', 'jobSeeker', 'job', 'company.image', 'jobSeeker.image'] });
    }


    async getApplyById(companyId: string, jobSeekerId: string, jobId: string): Promise<any> {
        if (companyId) {
            return this.jobApplyRepository.find({ relations: ['documents', 'company', 'jobSeeker', 'job', 'company.image', 'jobSeeker.image', 'jobSeeker.education', 'jobSeeker.experience'], where: { company: { companyId } }, order: { updatedAt: 'DESC' } });
        } else if (jobSeekerId) {
            return this.jobApplyRepository.find({ relations: ['documents', 'company', 'jobSeeker', 'job', 'company.image', 'jobSeeker.image', 'jobSeeker.education', 'jobSeeker.experience'], where: { jobSeeker: { jobSeekerId }, isRejected: false }, order: { updatedAt: 'DESC' } });
        } else if (jobId) {
            return this.jobApplyRepository.find({ relations: ['documents', 'company', 'jobSeeker', 'job', 'company.image', 'jobSeeker.image', 'jobSeeker.education', 'jobSeeker.experience'], where: { job: { jobId }, isRejected: false }, order: { updatedAt: 'DESC' } });
        }
    }

    async setSeen(companyId: string, jobSeekerId: string): Promise<any> {
        if (companyId) {
            return this.jobApplyRepository.update({ companySeen: false }, { companySeen: true });
        } else if (jobSeekerId) {
            return this.jobApplyRepository.update({ seekerSeen: false }, { seekerSeen: true });
        }
    }


    async createJobApply(jobApply: any): Promise<any> {
        const newApply = this.jobApplyRepository.create(jobApply);
        return this.jobApplyRepository.save(newApply);
    }


    async updateJobApply(jobApplyObj: any): Promise<JobApply> {
        let selectedUser = await this.jobApplyRepository.findOne({ where: { applyId: jobApplyObj.applyId }, relations: ['company', 'jobSeeker', 'job', 'company.image', 'jobSeeker.image'] });
        if (jobApplyObj?.isHired && !selectedUser.isHired) {
            const obj = { jobId: selectedUser.job.jobId, ishHired: true }
            await this.jobService.updateJob(obj)
        }
        selectedUser = jobApplyObj;


        return this.jobApplyRepository.save(selectedUser);
    }



    // async deleteJobApply(id: string): Promise<JobApply> {
    //     const user = await this.getJobById(id);
    //     return this.jobApplyRepository.remove(user);
    // }


}
