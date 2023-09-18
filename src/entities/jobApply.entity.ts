import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Jobs } from './jobs.entity';
import { JobsDto } from 'src/dto/jobs.dto';
import { FileEntity } from './file.entity';
import { JobSeeker } from './jobSeeker.entity';
import { Company } from './company.entity';

@Entity()
export class JobApply {
    @PrimaryGeneratedColumn()
    applyId: string;

    @OneToMany(type => FileEntity, file => file.applyDocuments, { nullable: true, cascade: true })
    @JoinColumn()
    documents: FileEntity[];

    @Column({ type: 'simple-array', array: true })
    preferedDates: Date[];

    @Column({ nullable: true })
    meetingDate: Date;

    @Column({ nullable: true })
    meetingLink: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    isRejected: Boolean = false;

    @Column()
    isHired: Boolean = false;

    @Column()
    companySeen: Boolean = false;

    @Column()
    seekerSeen: Boolean = true;

    @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.jobApplies)
    @JoinColumn()
    jobSeeker: JobSeeker;

    @ManyToOne(() => Company, (company) => company.jobApplies)
    @JoinColumn()
    company: Company;

    @ManyToOne(() => Jobs, (job) => job.jobApplies)
    @JoinColumn()
    job: Jobs;

}
