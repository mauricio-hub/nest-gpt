import * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto } from './dtos';
import OpenAI from 'openai';
import { TranslateDto } from './dtos/translate.dto';


//solo llama casos de ususo
@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusseStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({prompt,lang}: TranslateDto) {
    return await translateUseCase(this.openai, {  prompt, lang });
  }

  async textToAudio({ prompt, voice }:TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
    
  }

  async textToAudioGetter(fileId: string) {

    const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);

    const wasFileFound = fs.existsSync(filePath);

    if (!wasFileFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;


   

  } 

}
