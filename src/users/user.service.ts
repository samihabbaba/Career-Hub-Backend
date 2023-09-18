import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { UserDto } from 'src/dto/user.dto';
import { Company } from 'src/entities/company.entity';
import { JobSeeker } from 'src/entities/jobSeeker.entity';
import { User } from 'src/entities/user.entity';
import { JobSeekerService } from 'src/jobSeeker/job-seeker.service';
import { Repository } from 'typeorm';
import * as twilio from 'twilio';


@Injectable()
export class UserService {
    private client: twilio.Twilio;

    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, private jobSeekerService: JobSeekerService, private companyService: CompanyService) {
        this.client = twilio('ACfcdc8085c12ce9ad48c2fcbcf5e47d48', '873470bf6b17d9209e9f1ca519a8dfb8');
    }

    // async sendVerificationCode(phoneNumber: string, verificationCode: string): Promise<void> {
    //     const message = await this.client.messages.create({
    //       body: `Your verification code is: ${verificationCode}`,
    //       from: "+90",
    //       to: phoneNumber,
    //     });
    //   }



    getUsers(): Promise<User[]> {
        return this.usersRepository.find({ relations: ['jobSeeker', 'company'] });
    }


    async getUserById(id: string): Promise<UserDto> {
        // try {
        //   const user = await this.usersRepository.findOne({ where: { id } });
        //   return user;
        // } catch (err) {
        //   return err;
        // }
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['jobSeeker', 'company'] },);
        return user;
    }

    async createUser(user: UserDto): Promise<UserDto> {
        const valid = await this.validateUsername(user.username);
        if (user.role === 'jobSeeker') {
            const jobSeeker: JobSeeker = await this.jobSeekerService.createJobSeeker(new JobSeeker());
            user.jobSeeker = jobSeeker;
        } else if (user.role === 'company') {
            const company = await this.companyService.createCompany(new Company());
            user.company = company;
        }

        if (valid) {
            const newUser = this.usersRepository.create(user);
            return this.usersRepository.save(newUser);
        } else {
            throw new BadRequestException('username exists', 'username exists');
        }
    }

    async updateUser(user: UserDto): Promise<UserDto> {
        let selectedUser = await this.getUserById(user.id);
        selectedUser = user;
        return this.usersRepository.save(selectedUser);
    }

    async deleteUser(id: string): Promise<UserDto> {
        const user = await this.getUserById(id);
        return this.usersRepository.remove(user);
    }


    async validateUser(username: string, password: string): Promise<any | undefined> {
        const users = await this.usersRepository.find({ relations: ['jobSeeker', 'company'] });
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            return { ...user, password: 'not for you to see :)' }
        }
        return undefined
    }


    async validateUsername(username) {
        const users = await this.usersRepository.find();

        const exists = users.some(user => user.username === username);

        return !exists
    }

}
