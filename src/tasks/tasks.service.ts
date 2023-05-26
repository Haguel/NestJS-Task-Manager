import { Body, Get, HttpException, HttpStatus, Injectable, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/database/entities/Task';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            const newTask = this.taskRepository.save(createTaskDto);

            return await newTask;
        } catch (err) {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        try {
            const tasks = await this.taskRepository.find();

            if (!tasks.length) throw new HttpException("There is no entities", HttpStatus.NOT_FOUND);

            return tasks;
        } catch (err) {
            if (!(err instanceof HttpException)) {
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw err;
        }
    }

    @Get("/:id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        try {
            const task: Task = await this.taskRepository.findOne({
                select: ['title', 'description'],
                where: { id }
            });

            if (!task) throw new HttpException(`There is no models with id ${id}`, HttpStatus.NOT_FOUND);

            return task
        } catch (err) {
            if (!(err instanceof HttpException)) {
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw err;
        }
    }
}
