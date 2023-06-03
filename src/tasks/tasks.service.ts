import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDTO } from './tasks.model';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks') private readonly taskModel: Model<TaskDTO>,
    private readonly projectsService: ProjectsService,
  ) {}

  async insertTask(taskBody: TaskDTO) {
    const newTask = new this.taskModel(taskBody);

    await newTask.save();

    await this.projectsService.addTaskOnProject(taskBody.projectName, newTask);

    return newTask;
  }
}
