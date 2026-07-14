import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
//import { AppService } from './app.service.js';

@ApiTags('App')
@Controller()
export class AppController {
  constructor() {
    console.log('AppController initialized');
  }
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({ status: 200, description: 'Returns API metadataa' })
  getRoot() {
    return {
      name: 'EngineeringOS API',
      version: '1.0.0',
      status: 'OK',
      description: 'EngineeringOS API',
      documentation: '/api/docs',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
/*function getHealth(): any {
  throw new Error('Function not implemented.');
} */
