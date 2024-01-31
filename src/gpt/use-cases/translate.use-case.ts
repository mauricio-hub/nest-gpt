import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const  translateUseCase = async (openai: OpenAI,{prompt,lang}:Options) => {
  
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${ prompt }`,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.2, 
    //max_tokens: 500,

  });

  return {message:completion.choices[0].message.content};
};
