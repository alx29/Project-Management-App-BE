import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { NoteDTO } from 'src/notes/notes.model';
import { AuthGuard } from '@nestjs/passport';
import { TaskDTO } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('add_note/:task_id')
  async addNoteToTask(
    @Param('task_id') taskId: string,
    @Body() noteDTO: NoteDTO,
  ) {
    return await this.tasksService.addNoteToTask(taskId, noteDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete_note/:task_id/:note_id')
  async deleteNote(
    @Param('task_id') taskId: string,
    @Param('note_id') noteId: string,
  ) {
    return await this.tasksService.deleteNote(taskId, noteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update_task/:id')
  async updateTask(@Param('id') taskId: string, @Body() taskDTO: TaskDTO) {
    return await this.tasksService.updateTask(taskId, taskDTO);
  }
}
