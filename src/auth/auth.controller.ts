import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { ProjectsService } from 'src/projects/projects.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/:username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.getUser({ username });
    return user;
  }

  @Roles('project_manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all_users')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('auth/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);

    await this.projectsService.removeUserFromAllProjects(id);

    return user;
  }
}
