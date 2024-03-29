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
  completed: boolean;

  @Prop()
  important: boolean;

  @Prop()
  status: string;

  @Prop()
  projectManager: string;

  @Prop()
  assignedTo: string;

  @Prop()
  notesID: string[];
}

export const TaskSchema = SchemaFactory.createForClass(TaskDTO);
