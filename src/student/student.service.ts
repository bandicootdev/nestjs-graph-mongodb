import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { StudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async gerStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async getStudentForId(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(createStudent: StudentInput): Promise<StudentEntity> {
    const { name, lastname } = createStudent;
    const student = this.studentRepository.create({
      id: uuid(),
      name,
      lastname,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
