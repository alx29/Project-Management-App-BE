import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/users.model';

@Schema()
export class TaskDTO {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  status: string;

  @Prop()
  projectManager: string;

  @Prop()
  assignedTo: User;
}

export const ProjectSchema = SchemaFactory.createForClass(TaskDTO);
