import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema';

@Controller('')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    getAll(): Promise<Task[]> {
        return this.tasksService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") id: string): Promise<Task> {
        return this.tasksService.getOne(id);
    }
}
