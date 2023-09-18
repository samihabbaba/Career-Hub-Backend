import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';
import { Company } from './company.entity';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { CompanyDto } from 'src/dto/company.dto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: 'company' | 'jobSeeker' | 'admin' = 'jobSeeker';

    @Column()
    telephone: string;

    @OneToOne(() => JobSeeker, (jobSeeker) => jobSeeker.jobSeekerId)
    @JoinColumn()
    jobSeeker: JobSeeker;

    @OneToOne(() => Company, (company) => company.companyId)
    @JoinColumn()
    company: Company;

}
