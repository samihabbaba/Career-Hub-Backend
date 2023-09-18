import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {

    constructor(@InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>) {
    }

    async uploadFile(file: Express.Multer.File): Promise<FileEntity> {
        const { originalname, filename, mimetype, size } = file;
        const newFile = this.fileRepository.create({
            originalname,
            filename,
            mimetype,
            size,
        });
        return this.fileRepository.save(newFile);
    }


    async getFileById(id: any): Promise<FileEntity> {
        return this.fileRepository.findOne({where:{fileId: id}});
    }


}
