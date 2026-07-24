import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';


export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  organizationId!: string;


  @IsString()
  @IsNotEmpty()
  assignedToId!: string;


  @IsString()
  @IsNotEmpty()
  title!: string;


  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsString()
  taskType?: string;


  @IsOptional()
  @IsDateString()
  dueDate?: string;

}
