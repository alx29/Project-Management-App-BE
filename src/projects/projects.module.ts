import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectSchema } from './projects.model';
import { ProjectsService } from './projects.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'projects', schema: ProjectSchema }])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
