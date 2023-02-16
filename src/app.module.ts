import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/users.model';
import { AuthModule } from './auth/auth.module';
// mongodb+srv://alex:294318@cluster0.owg42th.mongodb.net/test
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://alex:294318@cluster0.owg42th.mongodb.net/test',
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
