import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';
import { JobSeekerDto } from 'src/dto/jobSeeker.dto';
import { isStringObject } from 'util/types';
import { Company } from './company.entity';
import { JobApply } from './jobApply.entity';


@Entity()
export class Jobs {
    @PrimaryGeneratedColumn()
    jobId: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    experience: "0-3" | '3-5' | "5+";

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    salary: string;

    @Column({ nullable: true })
    qualification: string;

    @Column({ nullable: true })
    industry: string;

    @Column({ nullable: true })
    companyId: string;

    @Column({ nullable: true })
    position: string;

    @Column({ nullable: true })
    employeeType: string;

    @Column({ nullable: true })
    jobDescription: string;

    @Column({ nullable: true, type: "simple-array", array: true })
    responsibilities: string;

    @Column({ nullable: true, type: "simple-array", array: true })
    requirements: string;

    @Column({ nullable: true, type: "simple-array", array: true })
    skills: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    isHired: Boolean = false;

    @ManyToOne(() => Company, (company) => company.jobs, { nullable: true })
    company: Company;

    @ManyToMany(() => JobSeeker, jobSeeker => jobSeeker.appliedJobs, { nullable: true })
    @JoinTable()
    applicants: JobSeeker[];

    @Column({ nullable: true })
    category: string;

    @OneToMany(type => JobApply, apply => apply.job, { cascade: true })
    jobApplies: JobApply[];


}