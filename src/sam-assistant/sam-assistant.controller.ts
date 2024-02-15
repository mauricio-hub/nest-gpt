import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { CreateSamAssistantDto } from './dto/create-sam-assistant.dto';
import { UpdateSamAssistantDto } from './dto/update-sam-assistant.dto';
import { QuestionDto } from './dto/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.samAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto:QuestionDto){
    return questionDto
  }



}
