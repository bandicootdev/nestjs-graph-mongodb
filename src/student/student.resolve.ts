import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { StudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolve {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  students() {
    return this.studentService.gerStudents();
  }
  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudentForId(id);
  }
  @Mutation(() => StudentType)
  createStudent(@Args('createStudent') createStudent: StudentInput) {
    return this.studentService.createStudent(createStudent);
  }
}
