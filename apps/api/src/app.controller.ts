import { Controller, Get } from '@nestjs/common';
//import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor() {
    console.log('AppController initialized');
  }
  @Get()
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
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
