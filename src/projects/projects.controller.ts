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
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskDTO } from 'src/tasks/tasks.model';
import { NoteDTO } from 'src/notes/notes.model';
import { NotesService } from 'src/notes/notes.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
    private readonly notesService: NotesService,
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
  @Put('update_users/:id')
  async updateUsersOnProject(@Param('id') id: string, @Body() user: User) {
    return await this.projectsService.updateUsersOnProject(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all_users/:id')
  async getUsersFromAProject(@Param('id') id: string) {
    return await this.projectsService.getUsersOnAProject(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all_tasks/:id')
  async getTasksFromAProject(@Param('id') id: string) {
    return await this.projectsService.getTasksOnAProject(id);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('clear_users/:id')
  async clearUsersOnProject(@Param('id') id: string) {
    return await this.projectsService.clearUsersOnProject(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create_task')
  async addTask(@Body() taskBody: TaskDTO) {
    const task = await this.tasksService.insertTask(taskBody);

    await this.projectsService.addTaskOnProject(taskBody.projectName, task);

    return task;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete_task/:projectName/:taskId')
  async deleteTask(
    @Param('projectName') projectName,
    @Param('taskId') taskId: string,
  ) {
    const task = await this.projectsService.deleteTaskOnProject(
      projectName,
      taskId,
    );

    return task;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update_task/:projectName/:taskId')
  async updateTask(
    @Param('projectName') projectName: string,
    @Param('taskId') taskId: string,
    @Body() taskBody: TaskDTO,
  ) {
    const project = await this.projectsService.updateTask(
      projectName,
      taskId,
      taskBody,
    );

    return project;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create_note/:projectName/:taskId')
  async createTask(
    @Param('projectName') projectName: string,
    @Param('taskId') taskId: string,
    @Body() noteBody: NoteDTO,
  ) {
    const note = await this.projectsService.createNote(
      projectName,
      taskId,
      noteBody,
    );
    return note;
  }
}
