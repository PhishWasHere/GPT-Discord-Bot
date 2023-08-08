export interface Message {
    author: {
        id: string;
        username: string;
        user_id: string;
        content: string;
        createdTimestamp: number;
    };
    channel:{
        type: number;
    },
    createdTimestamp: number;
    role: MessageRole;
    content: string;
}

export enum MessageRole{
    System = 'system',
    Assistant = 'assistant',
    User = 'user',
}

export type Prompt = {
    role: MessageRole;
    content: string;
};