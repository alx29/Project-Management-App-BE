import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './projects.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private readonly projectModel: Model<ProjectDTO>,
    private readonly usersService: UsersService,
  ) {}

  async insertProject(projectBody: ProjectDTO) {
    const projectManager = await this.usersService.getUser({
      username: projectBody.projectManager,
    });

    if (projectBody.users) {
      projectBody.users = [...projectBody.users, projectManager];
    } else {
      projectBody.users = [projectManager];
    }

    const newProject = new this.projectModel(projectBody);

    await newProject.save();

    return newProject;
  }

  async updateProject(id: string, updateProjectDTO: ProjectDTO) {
    const project = await this.projectModel.findById(id);

    if (updateProjectDTO.name) {
      project.name = updateProjectDTO.name;
    }
    if (updateProjectDTO.description) {
      project.description = updateProjectDTO.description;
    }
    if (updateProjectDTO.startDate) {
      project.startDate = updateProjectDTO.startDate;
    }
    if (updateProjectDTO.endDate) {
      project.endDate = updateProjectDTO.endDate;
    }
    if (updateProjectDTO.budget) {
      project.budget = updateProjectDTO.budget;
    }
    if (updateProjectDTO.status) {
      project.status = updateProjectDTO.status;
    }
    if (updateProjectDTO.projectManager) {
      project.projectManager = updateProjectDTO.projectManager;
    }
    if (updateProjectDTO.users) {
      // check if one of users already exists on the project

      project.users = [...project.users, ...updateProjectDTO.users];
    }

    const updatedProject = new this.projectModel(project);

    await updatedProject.save();

    return project;
  }

  async getProject(query: object): Promise<ProjectDTO> {
    return this.projectModel.findOne(query);
  }

  async getProjectById(id: string): Promise<ProjectDTO> {
    return this.projectModel.findById(id);
  }

  async updateUsersOnProject(id: string, user: User) {
    const project = await this.getProjectById(id);
    const username = user.username;
    const userToAdd = await this.usersService.getUser({ username });

    project.users.push(userToAdd);
    const updatedProject = new this.projectModel(project);

    await updatedProject.save();
    return project;
  }

  async getUsersOnAProject(id: string) {
    const project = await this.getProjectById(id);

    return project.users;
  }

  async deleteProject(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);

    return project;
  }

  async clearUsersOnProject(id: string) {
    const project = await this.projectModel.findById(id);
    let projectManager = null;
    if (project.users) {
      for (const user of project.users) {
        if (user.username === project.projectManager) {
          projectManager = user;
        }
      }

      if (projectManager) {
        project.users = [projectManager];
      }
    }

    return project;
  }
}
