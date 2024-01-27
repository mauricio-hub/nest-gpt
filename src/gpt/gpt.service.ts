import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {

    //solo llama casos de ususo
    
    async ortographyCheck(){
        return await orthographyCheckUseCase();
    }
}
