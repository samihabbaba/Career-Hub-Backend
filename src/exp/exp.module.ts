import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpService } from './exp.service';
import { Exp } from 'src/entities/exp.entity';
import { ExpController } from './exp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Exp])],
    providers: [ExpService],
    controllers: [ExpController],
    exports: [ExpService]
})
export class ExpModule { }