import OpenAI from "openai";


interface Options {
    threadId: string;
    assistentId?: string;
}

export const createRunUseCase = async (openai:OpenAI,options:Options) => {

    const {threadId,assistentId =  `${process.env.ASSISTANT_ID}`} = options

    const run = await  openai.beta.threads.runs.create(threadId,{
        assistant_id: assistentId
    });


    console.log(run);

    return run
  


}