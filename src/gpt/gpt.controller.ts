import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/orthography-check')
  async orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    //return orthographyDto;
    return this.gptService.ortographyCheck()
  }
}