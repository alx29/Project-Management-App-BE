import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('projects') private readonly projectModel: Model<Project>) { }
  
  async insertProject(name: string, description: string, startDate: Date, endDate: Date,
    budget: number, status: string) {

    const newProject = new this.projectModel({
      name,
      description,
      startDate,
      endDate,
      budget,
      status,
    });

    await newProject.save();
    
    return newProject;
  }
}
