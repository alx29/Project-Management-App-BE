import { Body, Controller, Post } from '@nestjs/common';
import { ProjectDTO } from './projects.model';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post('/create_project')
  async addProject(
    @Body() body: ProjectDTO 
  ) {
    const project = await this.projectsService.insertProject(body);
    
    return {
      msg: 'Project creates',
      projectName: project.name,
      projectDescription: project.description,
      projectBudget: project.budget,
      projectStatus: project.status,
    };
  }
}
