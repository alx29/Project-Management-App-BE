import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/users.model';

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  status: string;

  @Prop()
  users: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);