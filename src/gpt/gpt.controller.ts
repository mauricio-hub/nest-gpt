import { Body, Controller, HttpStatus, Post, Res,Get } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto } from './dtos';
import type { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/orthography-check')
  async orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('/pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('/pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusseStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piace = chunk.choices[0].delta.content || '';
      // console.log(piace);
      res.write(piace);
    }
    res.end();
  }

  @Post('/translate')
  translateText(@Body() translateDto: TranslateDto) {
    return this.gptService.translateText(translateDto);
  }

  @Post('/text-to-audio')
  async textToAudio(@Body() textToAudioDto: TextToAudioDto, @Res() res: Response) {
   const filePath = await this.gptService.textToAudio(textToAudioDto);
   res.setHeader('Content-Type', 'audio/mp3');
   res.status(HttpStatus.OK)
   res.sendFile(filePath);
  }

  @Get('/text-to-audio/:fileId')
  async textToAudioGetter(@Body() textToAudioDto: TextToAudioDto, @Res() res: Response) {
  /*  const filePath = await this.gptService.textToAudio(textToAudioDto);
   res.setHeader('Content-Type', 'audio/mp3');
   res.status(HttpStatus.OK)
   res.sendFile(filePath); */
  }
}
