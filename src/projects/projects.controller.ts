import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProjectDTO } from './projects.model';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { TaskDTO } from 'src/tasks/tasks.model';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/create_project')
  async addProject(@Body() body: ProjectDTO) {
    const project = await this.projectsService.insertProject(body);

    return {
      msg: 'Project created',
      projectName: project.name,
      projectDescription: project.description,
      projectBudget: project.budget,
      projectStatus: project.status,
    };
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all_projects')
  async getAllProjects() {
    return await this.projectsService.getAllProjects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all_projects/:user_id')
  async getAllProjectsFromUser(@Param('user_id') userId: string) {
    const projects = await this.projectsService.getAllProjects();
    const userProjects = [];

    for (const p of projects) {
      if (p.usersID.includes(userId)) {
        userProjects.push(p);
      }
    }

    return userProjects;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get_project/:projectName')
  async getProject(@Param('projectName') projectName: string) {
    const project = await this.projectsService.getProject({
      name: projectName,
    });

    return project;
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: ProjectDTO,
  ) {
    return this.projectsService.updateProject(id, updateProjectDTO);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('add_user/:project_id/:username')
  async addUserToProject(
    @Param('project_id') projectId: string,
    @Param('username') username: string,
  ) {
    return await this.projectsService.addUserToProject(projectId, username);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all_users/:project_id')
  async getAllUsers(@Param('project_id') projectId: string) {
    return await this.projectsService.getAllUsers(projectId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all_tasks/:project_id')
  async getAllTaskFromProject(@Param('project_id') projectId: string) {
    const project = await this.projectsService.getProjectById(projectId);

    const tasks = await this.tasksService.getAllTasks();

    const allTasks = [];

    for (const t of tasks) {
      if (project?.tasksID?.includes(t._id)) {
        allTasks.push(t);
      }
    }

    return allTasks;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('add_task/:project_id')
  async addTaskToProject(
    @Param('project_id') projectId: string,
    @Body() taskDTO: TaskDTO,
  ) {
    return await this.projectsService.addTaskToProject(projectId, taskDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update_task/:project_id/:task_id')
  async updateTaskToProject(
    @Param('project_id') projectId: string,
    @Param('task_id') taskId: string,
    @Body() taskDTO: TaskDTO,
  ) {
    return await this.projectsService.updateTaskOnProject(
      projectId,
      taskId,
      taskDTO,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete_task/:task_id')
  async removeTaskFromProject(@Param('task_id') taskId: string) {
    return await this.projectsService.removeTaskFromProject(taskId);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('remove_user/:project_id/:user_id')
  async removeUserFromProject(
    @Param('project_id') projectId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.projectsService.removeUserFromProject(projectId, userId);
  }
}
