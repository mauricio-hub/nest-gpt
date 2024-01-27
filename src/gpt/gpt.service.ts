import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {

    //solo llama casos de ususo
    
    async ortographyCheck(
        orthographyDto:OrthographyDto
    ){
        return await orthographyCheckUseCase({
            prompt: orthographyDto.prompt
        })
    }
}
