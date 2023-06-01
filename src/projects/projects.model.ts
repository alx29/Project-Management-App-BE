import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  projectManager: string;

  @Prop()
  users: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDTO);
