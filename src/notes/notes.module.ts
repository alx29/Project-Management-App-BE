import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './notes.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'notes', schema: NoteSchema }])],
  providers: [JwtStrategy, RolesGuard, NotesService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
