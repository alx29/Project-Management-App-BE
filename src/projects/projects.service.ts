import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './projects.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { TaskDTO } from 'src/tasks/tasks.model';
import { TasksService } from 'src/tasks/tasks.service';
import { NotesService } from 'src/notes/notes.service';
import { NoteDTO } from 'src/notes/notes.model';
import { use } from 'passport';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private readonly projectModel: Model<ProjectDTO>,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
    private readonly notesService: NotesService,
  ) {}

  async insertProject(projectBody: ProjectDTO) {
    const projectManagerId = await this.usersService.getUserId(
      projectBody.projectManager,
    );

    if (projectBody.usersID) {
      projectBody.usersID = [...projectBody.usersID, projectManagerId];
    } else {
      projectBody.usersID = [projectManagerId];
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

  async getAllProjects() {
    return await this.projectModel.find().exec();
  }

  async addUserToProject(projectId: string, username: string) {
    const project = await this.getProjectById(projectId);
    const userId = await this.usersService.getUserId(username);

    project.usersID.push(userId);

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();

    return updatedProject;
  }

  async deleteProject(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);

    return project;
  }

  async getAllUsers(projectId: string) {
    const project = await this.getProjectById(projectId);
    const users = await this.usersService.getUsers();
    const allUsers = [];
    for (const userIdFromProject of project.usersID) {
      for (const user of users) {
        if (user._id.toString() === userIdFromProject) {
          allUsers.push(user);
        }
      }
    }

    return allUsers;
  }

  async addTaskToProject(projectId: string, taskDTO: TaskDTO) {
    const project = await this.getProjectById(projectId);
    const task = await this.tasksService.insertTask(taskDTO);

    if (project.tasksID) {
      project.tasksID.push(task._id.toString());
    } else {
      project.tasksID = [task._id.toString()];
    }

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();

    return task;
  }

  async removeTaskFromProject(taskId: string) {
    const task = await this.tasksService.deleteTaskById(taskId);
    if (task === null) {
      return `Task ${taskId} doesn't exist`;
    }

    const projects = await this.getAllProjects();

    for (const project of projects) {
      const index = project.tasksID.indexOf(taskId);
      if (index !== -1) {
        project.tasksID.splice(index, 1);
        const updatedProject = new this.projectModel(project);
        await updatedProject.save();

        return `Task ${taskId} removed! from ${updatedProject.name}`;
      }
    }

    return `Task ${taskId} not found!`;
  }

  async removeUserFromAllProjects(userId: string) {
    const projects = await this.getAllProjects();

    let projectToUpdate = null;
    for (const project of projects) {
      if (project.usersID.includes(userId)) {
        const index = project.usersID.indexOf(userId);
        project.usersID.splice(index, 1);
        projectToUpdate = new this.projectModel(project);
        await projectToUpdate.save();
      }
    }
  }

  async removeUserFromProject(projectId: string, userId: string) {
    const project = await this.getProjectById(projectId);

    const index = project.usersID.indexOf(userId);
    if (index !== -1) {
      project.usersID.splice(index, 1);

      const updatedProject = new this.projectModel(project);
      await updatedProject.save();
      return `User ${userId} removed successfully from project ${projectId};`;
    }

    return `User ${userId} not found on project ${projectId}`;
  }
}
