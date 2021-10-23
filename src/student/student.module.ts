import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { StudentResolve } from './student.resolve';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentResolve, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
