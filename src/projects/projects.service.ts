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

  async updateProject() {

  }
}
