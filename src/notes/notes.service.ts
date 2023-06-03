import { Injectable } from '@nestjs/common';
import { NoteDTO } from './notes.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('notes') private readonly notesModel: Model<NoteDTO>,
  ) {}

  async addNote(note: NoteDTO) {
    const newNote = new this.notesModel(note);

    await newNote.save();

    return newNote;
  }
}
