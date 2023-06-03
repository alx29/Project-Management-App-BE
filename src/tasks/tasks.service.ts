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
}
