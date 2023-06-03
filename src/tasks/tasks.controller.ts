import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDTO } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create_task')
  async addTask(@Body() body: TaskDTO) {
    const task = await this.tasksService.insertTask(body);

    return {
      msg: 'Task created',
      projectManagerName: task.projectManager,
      taskName: task.name,
      taskDescription: task.description,
      taskStatus: task.status,
    };
  }
}
