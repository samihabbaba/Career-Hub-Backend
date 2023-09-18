import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { Exp } from 'src/entities/exp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpService {

    constructor(@InjectRepository(Exp)
    private expRepository: Repository<Exp>,) {
    }


    async getExps(): Promise<Exp[]> {
        return this.expRepository.find();
    }


    async getExpById(expId: string): Promise<Exp> {
        // try {
        //   const user = await this.usersRepository.findOne({ where: { id } });
        //   return user;
        // } catch (err) {
        //   return err;
        // }
        const job = await this.expRepository.findOne({ where: { expId } });
        return job;
    }


    async createExp(job: any): Promise<any> {
        const newExp = this.expRepository.create(job);
        return this.expRepository.save(newExp);
    }


    async updateExp(user: any): Promise<Exp> {
        if (user?.expId) {

            let selectedUser = await this.getExpById(String(user.expId));
            selectedUser = user;
            return await this.expRepository.save(selectedUser);
        } else {
            return await this.createExp(user)
        }
    }



    async deleteExp(id: string): Promise<Exp> {
        const user = await this.getExpById(id);
        return this.expRepository.remove(user);
    }


}
