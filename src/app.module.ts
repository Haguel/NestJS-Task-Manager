import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TasksModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env.test',
      isGlobal: true
    }),
  ],
})
export class AppModule { }
