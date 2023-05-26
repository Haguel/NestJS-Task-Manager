import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    getAll() {
        return this.tasksService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id", ParseIntPipe) id: number) {
        return this.tasksService.getOne(id);
    }
}
