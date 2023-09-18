import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {

    constructor(private fileService: FileService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadFile(file);
    }


    @Get(':id')
    async getFileById(@Param('id') id: number, @Res() res: Response) {
        const file = await this.fileService.getFileById(id);

        if (!file) {
        // File not found, return appropriate response
            return res.status(404).json({ message: 'File not found' });
        }

        // Set appropriate Content-Type header based on the file mimetype
        res.set('Content-Type', file.mimetype);

        // Send the file as the response
        return res.sendFile(file.filename, { root: 'uploads' });
    }
}
