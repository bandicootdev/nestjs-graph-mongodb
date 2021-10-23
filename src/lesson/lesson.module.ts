import { Module } from '@nestjs/common';
import { LessonResolve } from './lesson.resolve';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), StudentModule],
  providers: [LessonResolve, LessonService],
})
export class LessonModule {}
