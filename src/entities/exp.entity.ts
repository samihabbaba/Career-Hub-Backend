import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';

@Entity()
export class Exp {
    @PrimaryGeneratedColumn()
    expId: string;

    @ManyToOne(() => JobSeeker, (company) =>  company.education, { nullable: true })
    jobSeekerEdu: JobSeeker;

    @ManyToOne(() => JobSeeker, (company) =>  company.experience, { nullable: true })
    jobSeekerExp: JobSeeker;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    expName: string;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    description: string;

}
