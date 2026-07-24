import {
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';


export class UpdateTaskDto {


  @IsOptional()
  @IsString()
  title?: string;


  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsString()
  status?: string;


  @IsOptional()
  @IsString()
  assignedToId?: string;


  @IsOptional()
  @IsDateString()
  dueDate?: string;

}
