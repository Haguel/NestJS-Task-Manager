import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/Task';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'mysql',
                host: config.get<string>('HOST'),
                port: config.get<number>('PORT'),
                username: config.get<string>('USER'),
                password: config.get<string>('PASSWORD'),
                database: config.get<string>('DATABASE'),
                entities: [Task],
                synchronize: true,
            }),
        }),

    ]
})
export class DatabaseModule { }
