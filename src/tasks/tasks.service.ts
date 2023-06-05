import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDTO } from './tasks.model';
import { NoteDTO } from 'src/notes/notes.model';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks') private readonly taskModel: Model<TaskDTO>,
    private readonly notesService: NotesService,
  ) {}

  async insertTask(taskBody: TaskDTO) {
    const newTask = new this.taskModel(taskBody);

    await newTask.save();

    return newTask;
  }

  async findTaskByName(name: string) {
    return await this.taskModel.findOne({ name });
  }

  async findTaskById(id: string) {
    return await this.taskModel.findById(id);
  }

  async deleteTaskById(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async updateTask(id: string, updateTaskDTO: TaskDTO) {
    const task = await this.findTaskById(id);

    if (updateTaskDTO.name) {
      task.name = updateTaskDTO.name;
    }
    if (updateTaskDTO.projectName) {
      task.projectName = updateTaskDTO.projectName;
    }
    if (updateTaskDTO.description) {
      task.description = updateTaskDTO.description;
    }
    if (updateTaskDTO.startDate) {
      task.startDate = updateTaskDTO.startDate;
    }
    if (updateTaskDTO.endDate) {
      task.endDate = updateTaskDTO.endDate;
    }
    if (updateTaskDTO.status) {
      task.status = updateTaskDTO.status;
    }
    if (updateTaskDTO.projectManager) {
      task.projectManager = updateTaskDTO.projectManager;
    }
    if (updateTaskDTO.assignedTo) {
      task.assignedTo = updateTaskDTO.assignedTo;
    }

    const updatedTask = new this.taskModel(task);
    await updatedTask.save();

    return updatedTask;
  }

  async addNoteToTask(taskId: string, noteDTO: NoteDTO) {
    const note = await this.notesService.addNote(noteDTO);

    const task = await this.findTaskById(taskId);
    if (task.notesID) {
      task.notesID.push(note._id.toString());
    } else {
      task.notesID = [note._id.toString()];
    }

    const updatedTask = new this.taskModel(task);
    await updatedTask.save();

    return note;
  }

  async removeNoteFromTask(taskId: string, noteId: string) {
    const task = await this.findTaskById(taskId);
    if (task.notesID) {
      const index = task.notesID.indexOf(noteId);
      if (index !== -1) {
        task.notesID.splice(index, 1);
      }
    }

    const updatedTask = new this.taskModel(task);
    await updatedTask.save();

    return `Note ${noteId} removed!`;
  }

  async deleteNote(taskId: string, noteId: string) {
    const note = await this.notesService.removeNote(noteId);

    await this.removeNoteFromTask(taskId, noteId);

    return note;
  }
}
