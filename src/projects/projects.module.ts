import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectSchema } from './projects.model';
import { ProjectsService } from './projects.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserSchema } from 'src/users/users.model';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'projects', schema: ProjectSchema },
      { name: 'user', schema: UserSchema },
    ]),
  ],
  providers: [ProjectsService, JwtStrategy, RolesGuard, UsersService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
