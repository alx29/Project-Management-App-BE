import { Controller, Request, Post, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/:username')
  async getUser(@Param('username') username: string) {
    const user = this.usersService.getUser({ username });
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all_users')
  async getUsers() {
    return this.usersService.getUsers();
  }
}
