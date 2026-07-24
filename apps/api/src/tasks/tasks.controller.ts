import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';


import {
  ApiTags,
} from '@nestjs/swagger';


import {
  CurrentUser,
} from '../auth/decorators/current-user.decorator';


import {
  User,
} from '@prisma/client';


import {
  JwtAuthGuard,
} from '../auth/guards/jwt-auth.guard';


import {
  UseGuards,
} from '@nestjs/common';


import {
  TasksService,
} from './tasks.service';


import {
  CreateTaskDto,
} from './dto/create-task.dto';


import {
  UpdateTaskDto,
} from './dto/update-task.dto';




@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {



  constructor(
    private readonly tasksService: TasksService,
  ) {}





  @Post()
  async create(

    @CurrentUser() user: User,

    @Body() dto: CreateTaskDto,

  ){

    return this.tasksService.create(
      user.id,
      dto,
    );

  }





  @Get('organization/:organizationId')
  async findOrganizationTasks(

    @Param('organizationId')
    organizationId:string,

  ){

    return this.tasksService.findOrganizationTasks(
      organizationId,
    );

  }





  @Patch(':id')
  async update(

    @Param('id')
    id:string,

    @Body()
    dto:UpdateTaskDto,

  ){

    return this.tasksService.update(
      id,
      dto,
    );

  }





  @Delete(':id')
  async remove(

    @Param('id')
    id:string,

  ){

    return this.tasksService.remove(
      id,
    );

  }



}
