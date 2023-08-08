import { Document, Model } from 'mongoose';

// Define the structure of a content document
export interface ContentDocument { 
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: number;
    gpt_response: string;
    tokens: {
        prompt: number;
        completion: number;
        total: number;
    }[];
}

// Define the structure of a user document
export interface UserDocument extends Document { 
    user_id: string;
    global_name: string;
    username: string;
    content: ContentDocument[];
    created_at: Date;
}

// Define the User model type (you might need to adjust the model name)
export type UserModel = Model<UserDocument>; 

// Define the type for the existingUser function
export type ExistingUserFunction = ( 
    msg: Message,
    msgContent: string,
    userData: UserDocument
) => Promise<void>;


// Define the Message type (from your previous definition)
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

// Define the MessageRole enum (from your previous definition)
export enum MessageRole{ 
    System = 'system',
    Assistant = 'assistant',
    User = 'user',
}

export type Prompt = {
    role: MessageRole;
    content: string;
};