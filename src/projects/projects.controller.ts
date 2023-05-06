import { Body, Controller, Param, Post, Get, Put, UseGuards } from '@nestjs/common';
import { ProjectDTO } from './projects.model';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/create_project')
  async addProject(@Body() body: ProjectDTO) {
    const project = await this.projectsService.insertProject(body);

    return {
      msg: 'Project creates',
      projectName: project.name,
      projectDescription: project.description,
      projectBudget: project.budget,
      projectStatus: project.status,
    };
  }

  @Get('/:projectName')
  async getProject(@Param('projectName') projectName: string) {
    const project = this.projectsService.getProject({ projectName });
    return project;
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateaProjectDTO: ProjectDTO,
  ) {
    return this.projectsService.updateProject(id, updateaProjectDTO);
  }
}
