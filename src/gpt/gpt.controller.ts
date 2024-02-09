import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
} from './dtos';
import type { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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

  @Get('/text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string,
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileId);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('/text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('/audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        },
      }),
    }),
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File size too large',
          }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto,
  ) {
    return this.gptService.audioToText(file, audioToTextDto);
  }

  @Post('/image-generation')
  async imageGeneration(@Body() imageGenerationDto:ImageGenerationDto) {
   return await this.gptService.imageGeneration(imageGenerationDto);

  }


  @Get('/image-generation/:filename')
  async getImageGeneration(
  @Res() res: Response,
  @Param('filename') filename: string,) {
    
    
    const filePath = await this.gptService.imageGenerationGetter(filename);

    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath)

  }


  @Post('/image-variation')
  async imageVariation(@Body() imageVariationDto:ImageVariationDto) {
   return await this.gptService.imageVariation(imageVariationDto);

  }

  

}
