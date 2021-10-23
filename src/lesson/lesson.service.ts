import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './lesson.input';
@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  async getLessons(): Promise<LessonEntity[]> {
    return this.lessonRepository.find();
  }
  async getLesson(id: string): Promise<LessonEntity> {
    return this.lessonRepository.findOne({ id: id });
  }

  async createLesson(createLessonInput: LessonInput): Promise<LessonEntity> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: students,
    });
    return this.lessonRepository.save(lesson);
  }

  async assignStudentToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    if (!lesson) {
      throw new NotFoundException('lesson not found');
    }
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
