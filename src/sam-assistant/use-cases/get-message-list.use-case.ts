import OpenAI from "openai";


interface Options {
    threadId: string;
}


export const getMessagesListUseCase = async (openai:OpenAI,options:Options) => {

    const {threadId} = options;

    const messagesList = await openai.beta.threads.messages.list(
        threadId
    );

    const messages = messagesList.data.map(message =>({
        role:message.role,
        content:message.content.map(content => (content as any).text.value)
    }));

    return messages;
  

}