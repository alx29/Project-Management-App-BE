import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskDTO } from 'src/tasks/tasks.model';
import { User } from 'src/users/users.model';

@Schema()
export class ProjectDTO {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  budget: number;

  @Prop()
  status: string;

  @Prop()
  category: string;

  @Prop()
  projectManager: string;

  @Prop()
  usersID: string[];

  @Prop()
  tasksID: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDTO);
