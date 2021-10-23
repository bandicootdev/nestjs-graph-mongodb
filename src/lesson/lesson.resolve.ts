import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from './assignStudentToLesson.input';
import { LessonEntity } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolve {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLesson(@Args('createLessonInput') createLessonInput: LessonInput) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentToLesson(
    @Args('assignStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentToLessonInput;
    return this.lessonService.assignStudentToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: LessonEntity) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
