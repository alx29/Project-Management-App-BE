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

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
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
  @Put(':id/update_users')
  async updateUsersOnProject(@Param('id') id: string, @Body() user: User) {
    return await this.projectsService.updateUsersOnProject(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/all_users')
  async getUsersFromAProject(@Param('id') id: string) {
    return await this.projectsService.getUsersOnAProject(id);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/clear_users')
  async clearUsersOnProject(@Param('id') id: string) {
    return await this.projectsService.clearUsersOnProject(id);
  }
}
