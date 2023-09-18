import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { JobApply } from './jobApply.entity';

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    fileId: number;

    @Column()
    originalname: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @Column()
    size: number;

    @ManyToOne(() => JobApply, (apply) => apply.documents, { nullable: true })
    applyDocuments: JobApply;
}