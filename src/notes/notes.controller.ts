import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';
import { NoteDTO } from './notes.model';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all_notes')
  async getAllNotes() {
    return await this.notesService.getAllNotes();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getNote(@Param('id') id: string) {
    return await this.notesService.getNote(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update_note/:note_id')
  async updateNote(@Param('note_id') noteId: string, @Body() noteDTO: NoteDTO) {
    this.notesService.updateNote(noteId, noteDTO);
  }
}
