import OpenAI from "openai";
import { downloadImageAsPng } from "src/helper";


interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI,options:Options) => {

    const { prompt, originalImage, maskImage } = options;

    //TODO verificar originalImage y maskImage

    const  response = await openai.images.generate({
        prompt: prompt,
        model:'dall-e-3',
        n:1,
        size:'1024x1024',
        quality:'standard',
        response_format:'url',
       
    });

   const url = await downloadImageAsPng(response.data[0].url);

   

    return {
        url: url,
        onpenIAUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    }
  
}