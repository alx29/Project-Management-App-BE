import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class NoteDTO {
  @Prop({ required: true })
  name: string;

  @Prop()
  content: string;

  @Prop()
  taskName: string;
}

export const NoteSchema = SchemaFactory.createForClass(NoteDTO);
