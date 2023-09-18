import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entities/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.register({
        dest: './uploads',
    }), TypeOrmModule.forFeature([FileEntity])],
    providers: [FileService],
    controllers: [FileController],
    exports: [FileService]
})
export class FileModule { }