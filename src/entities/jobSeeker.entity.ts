import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exp } from './exp.entity';
import { Jobs } from './jobs.entity';
import { JobsDto } from 'src/dto/jobs.dto';
import { ExpDto } from 'src/dto/exp.dto';
import { FileEntity } from './file.entity';
import { JobApply } from './jobApply.entity';

@Entity()
export class JobSeeker {
    @PrimaryGeneratedColumn()
    jobSeekerId: string;

    @OneToOne(() => FileEntity, (file) => file.fileId, { nullable: true })
    @JoinColumn()
    image: FileEntity;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    surname: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    telephone: string;

    @Column({ nullable: true })
    linkedIn: string;

    @Column({ nullable: true })
    email: string;

    // @Column({ type: "simple-array", array: true, nullable: true })
    // documents: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    about: string;

    @Column({ type: "simple-array", array: true, nullable: true })
    languages: string;

    @Column({ type: "simple-array", array: true, nullable: true })
    skills: string;

    @OneToMany(type => Exp, exp => exp.jobSeekerEdu, { nullable: true, cascade: true })
    @JoinColumn()
    education: Exp[];

    @OneToMany(type => Exp, exp => exp.jobSeekerExp, { nullable: true, cascade: true })
    @JoinColumn()
    experience: Exp[];

    @ManyToMany(() => Jobs, job => job.applicants, { nullable: true, cascade: true })
    @JoinTable()
    appliedJobs: Jobs[];

    @OneToMany(type => JobApply, apply => apply.jobSeeker, { cascade: true })
    jobApplies: JobApply[];


}
