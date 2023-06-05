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

  async getNote(id: string) {
    return await this.notesModel.findById(id);
  }

  async updateNote(id: string, note: NoteDTO) {
    const oldNote = await this.getNote(id);

    if (note.name) {
      oldNote.name = note.name;
    }
    if (note.content) {
      oldNote.content = note.content;
    }

    const updatedNote = new this.notesModel(oldNote);

    await updatedNote.save();

    return updatedNote;
  }

  async removeNote(noteId: string) {
    return await this.notesModel.findByIdAndDelete(noteId);
  }
}
