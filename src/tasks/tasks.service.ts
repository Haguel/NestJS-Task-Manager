import { Body, Get, HttpException, HttpStatus, Injectable, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            const newTaskModel = new this.taskModel(createTaskDto);

            return await newTaskModel.save();
        } catch (err) {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll(): Promise<Task[]> {
        try {
            const models: Task[] = await this.taskModel.find()

            if (!models.length) throw new HttpException("There is no models", HttpStatus.NOT_FOUND);

            return models;
        } catch (err) {
            if (!(err instanceof HttpException)) {
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw err;
        }
    }

    @Get("/:id")
    async getOne(@Param("id") id: string): Promise<Task> {
        try {
            const model: Task = await this.taskModel.findById(id);

            if (!model) throw new HttpException(`There is no models with id ${id}`, HttpStatus.NOT_FOUND);

            return model
        } catch (err) {
            if (!(err instanceof HttpException)) {
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            throw err;
        }
    }
}
