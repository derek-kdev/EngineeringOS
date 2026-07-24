import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';



@Injectable()
export class TasksService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(
    userId: string,
    dto: CreateTaskDto,
  ) {


    return this.prisma.engineeringTask.create({

      data: {

        organizationId: dto.organizationId,

        assignedToId: dto.assignedToId,

        createdById: userId,

        title: dto.title,

        description: dto.description,

        taskType: dto.taskType as any,

        dueDate: dto.dueDate
          ? new Date(dto.dueDate)
          : undefined,

      },


      include: {

        assignedTo: {

          include: {

            user: true,

          },

        },


        createdBy: true,

      },

    });

  }





  async findOrganizationTasks(
    organizationId: string,
  ) {


    return this.prisma.engineeringTask.findMany({

      where: {

        organizationId,

      },


      include: {


        assignedTo: {

          include: {

            user: true,

          },

        },


        createdBy: true,


      },


      orderBy: {

        createdAt: 'desc',

      },

    });


  }






  async update(
    id:string,
    dto:UpdateTaskDto,
  ){


    const task =
      await this.prisma.engineeringTask.findUnique({

        where:{
          id,
        },

      });



    if(!task){

      throw new NotFoundException(
        'Task not found',
      );

    }



    return this.prisma.engineeringTask.update({

      where:{
        id,
      },


      data:{

        title:dto.title,

        description:dto.description,

        status:dto.status as any,

        assignedToId:dto.assignedToId,

        dueDate:dto.dueDate
          ? new Date(dto.dueDate)
          : undefined,

      },

    });


  }






  async remove(
    id:string,
  ){


    const task =
      await this.prisma.engineeringTask.findUnique({

        where:{
          id,
        },

      });



    if(!task){

      throw new NotFoundException(
        'Task not found',
      );

    }



    return this.prisma.engineeringTask.delete({

      where:{
        id,
      },

    });


  }



}
