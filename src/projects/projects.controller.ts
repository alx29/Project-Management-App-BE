import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post('/create_project')
  async addProject(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
    @Body('budget') budget: number,
    @Body('status') status: string,
  ) {
    const project = await this.projectsService.insertProject(name, description, startDate, endDate,
      budget, status);
    
    return {
      msg: 'Project creates',
      projectName: project.name,
      projectDescription: project.description,
      projectBudget: project.budget,
      projectStatus: project.status,
    };
  }
}
