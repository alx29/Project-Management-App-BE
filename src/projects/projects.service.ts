import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './projects.model';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { TaskDTO } from 'src/tasks/tasks.model';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private readonly projectModel: Model<ProjectDTO>,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
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

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();

    return project;
  }

  async addTaskOnProject(projectName: string, task: TaskDTO) {
    const project = await this.getProject({ name: projectName });

    project.tasks.push(task);

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();

    return task;
  }

  async deleteTaskOnProject(projectName: string, taskId: string) {
    const task = await this.tasksService.deleteTaskById(taskId);

    const project = await this.getProject({ name: projectName });

    const filteredTasks = project.tasks.filter((t) => t.name !== task.name);
    project.tasks = filteredTasks;

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();

    return task;
  }

  async getTasksOnAProject(id: string) {
    const project = await this.getProjectById(id);

    return project.tasks;
  }

  async updateTask(
    projectName: string,
    taskId: string,
    taskUpdateDTO: TaskDTO,
  ) {
    const project = await this.getProject({ name: projectName });
    const task = await this.tasksService.findTaskById(taskId);
    console.log(task);

    let taskToUpdate = null;
    for (const t of project.tasks) {
      if (t.name === task.name) {
        taskToUpdate = t;
        break;
      }
    }

    const updatedTask = await this.tasksService.updateTask(
      taskId,
      taskUpdateDTO,
    );

    if (taskUpdateDTO.name) {
      taskToUpdate.name = taskUpdateDTO.name;
    }
    if (taskUpdateDTO.projectName) {
      taskToUpdate.projectName = taskUpdateDTO.projectName;
    }
    if (taskUpdateDTO.description) {
      taskToUpdate.description = taskUpdateDTO.description;
    }
    if (taskUpdateDTO.startDate) {
      taskToUpdate.startDate = taskUpdateDTO.startDate;
    }
    if (taskUpdateDTO.endDate) {
      taskToUpdate.endDate = taskUpdateDTO.endDate;
    }
    if (taskUpdateDTO.status) {
      taskToUpdate.status = taskUpdateDTO.status;
    }
    if (taskUpdateDTO.projectManager) {
      taskToUpdate.projectManager = taskUpdateDTO.projectManager;
    }
    if (taskUpdateDTO.assignedTo) {
      taskToUpdate.assignedTo = taskUpdateDTO.assignedTo;
    }

    const updatedProject = new this.projectModel(project);
    await updatedProject.save();
    return project;
  }
}
