import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDTO } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks') private readonly taskModel: Model<TaskDTO>,
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

  async deleteTask(name: string) {
    const task = await this.findTaskByName(name);

    const deletedTask = await this.taskModel.findByIdAndDelete(task.id);

    return deletedTask;
  }

  async deleteTaskById(id: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);

    return deletedTask;
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
}
