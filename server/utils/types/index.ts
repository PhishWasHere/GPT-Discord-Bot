import { Schema, Types } from 'mongoose';

////////////////GPT/////////////////////
enum MessageRole{ // used for gpt config
    System = 'system',
    Assistant = 'assistant',
    User = 'user',
}

type Prompt = { // used for gpt config
    role: MessageRole;
    content: string;
};

interface UserPrompt{ // used for user prompts going into gpt
    role: string;
    content: string;
}

interface UserRes{ // used for user responses going into gpt
    role: string;
    content: string | null;
}

export { MessageRole, Prompt, UserPrompt, UserRes };
//////////////////////////////////////////

//////////////////DirectMessages/////////////////////
interface Token {
    prompt: number;
    completion: number;
    total: number;
}

interface Content {
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: Token[];
}

type UserData = {
    user_id: string;
    username: string;
    avatar?: string | null;
    created_at: Date;
    credit: number;
    eula: boolean;
    guilds: string[];
    content: Types.ObjectId[];
}

type UserContent = {
    user: Types.ObjectId; 
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: {
      prompt: number;
      completion: number;
      total: number;
    }[];
    expires?: Date;
}

type UserMessage = {
    user: string;
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: Token[];
    expires?: Date;
}

export { Token, Content, UserData, UserContent, UserMessage };
//////////////////////////////////////////////////////

//////////////////Guilds/////////////////////

interface Author {
    user_id: string;
    username: string;
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
}

interface GuildContent {
    author: Author[];
    gpt_response: string | null;
    tokens: Token[];
}

interface Guild { // used for guilds/servers
    owner_id: string;
    guild_id: string;
    guild_name: string;
    icon: string;
    content: GuildContent[];
    created_at: Date;
}

export { Author, GuildContent, Guild };
//////////////////////////////////////////////////////
//////////////////////JWT////////////////////////////

type JwtUser = {
    id: string;
}

export { JwtUser };

//////////////////////////////////////////////////////
