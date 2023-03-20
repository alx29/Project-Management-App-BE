import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  //post / signup
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
    @Body('email') userEmail: string,
    @Body('role') userRole: string,
    @Body('firstName') userFirstName: string,
    @Body('lastName') userLastName: string
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassword, userEmail,
      userRole, userFirstName, userLastName);
    
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }
  
}
