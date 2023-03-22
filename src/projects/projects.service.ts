import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('projects') private readonly projectModel: Model<ProjectDTO>) { }
  
  async insertProject(projectBody: ProjectDTO) {
    const newProject = new this.projectModel(projectBody);

    await newProject.save();
    
    return newProject;
  }

  async updateProject(id: string, updateProjectDTO: ProjectDTO) {
    const project = await this.projectModel.findById(id);
    
    project.name = updateProjectDTO.name;
    project.description = updateProjectDTO.description;
    project.startDate = updateProjectDTO.startDate;
    project.endDate = updateProjectDTO.endDate;
    project.budget = updateProjectDTO.budget;
    project.status = updateProjectDTO.status;
    project.projectManager = updateProjectDTO.projectManager;
    project.users = updateProjectDTO.users;

    const updatedProject = new this.projectModel(project);

    await updatedProject.save();

    return updatedProject;
  }

  async getProject(query: object): Promise<ProjectDTO> {
    return this.projectModel.findOne(query)
  }
}
