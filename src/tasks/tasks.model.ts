import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NoteDTO } from 'src/notes/notes.model';
import { User } from 'src/users/users.model';

@Schema()
export class TaskDTO {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  projectName: string;

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

  @Prop()
  notes: NoteDTO[];
}

export const TaskSchema = SchemaFactory.createForClass(TaskDTO);
