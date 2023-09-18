import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Jobs } from './jobs.entity';
import { JobsDto } from 'src/dto/jobs.dto';
import { FileEntity } from './file.entity';
import { JobApply } from './jobApply.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    companyId: string;

    @OneToOne(() => FileEntity, (file) => file.fileId, { nullable: true })
    @JoinColumn()
    image: FileEntity;

    @Column({ nullable: true })
    companyName: string;

    @Column({ nullable: true })
    companyEmail: string;

    @Column({ nullable: true })
    linkedId: string;

    @Column({ nullable: true })
    sector: string;

    @Column({ nullable: true })
    telephone: string;

    @Column({ nullable: true })
    owner: string;

    @Column({ nullable: true })
    employees: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    established: Date;

    @Column({ nullable: true })
    about: string;

    @OneToMany(type => Jobs, job => job.company, { nullable: true, cascade: true})
    @JoinColumn()
    jobs: Jobs[];

    @OneToMany(type => JobApply, apply => apply.company, { cascade: true })
    jobApplies: JobApply[];


}
