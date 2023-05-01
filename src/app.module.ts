import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env.test',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL)
  ],
})
export class AppModule { }
