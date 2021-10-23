import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastname: string;
}
