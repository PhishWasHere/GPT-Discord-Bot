import { Types } from 'mongoose';

/////////////Common////////////////////
interface Token {
    prompt: number;
    completion: number;
    total: number;
}
export { Token };
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

type UserData = {
    _id: Types.ObjectId;
    user_id: string;
    username: string;
    avatar?: string | null;
    created_at: Date;
    credit: number;
    eula: boolean;
    guilds: string[];
    content: Types.ObjectId[] | UserContent[];
}

type UserContent = {
    user: Types.ObjectId; 
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: Token[];
    expires?: Date;
}

type UserMessage = { // not using atm sort out later
    user: string;
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: Token[];
    expires?: Date;
}

export { UserData, UserContent, UserMessage };
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

type GuildData = {
    _id: Types.ObjectId;
    owner_id: string;
    guild_id: string;
    guild_name: string;
    icon: string | null;
    created_at: Date;
    credit: number;
    eula: boolean;
    content: Types.ObjectId[];
}

type GuildContent = {
    guild: Types.ObjectId;
    author: {
        user_id: string;
        username: string;
        global_name: string;
        message: string;
        message_id: string;
        created_timestamp: Date;
    }[];
    gpt_response: string | null;
    tokens: Token[];
}

export { Author, GuildContent, GuildData };
//////////////////////////////////////////////////////

//////////////////UsageRoutes/////////////////////
type UserDataType = {
    _id: Types.ObjectId;
    user_id: string;
    username: string;
    avatar?: string | null;
    created_at: Date;
    created_timestamp: Date;
    credit: number;
    eula: boolean;
    guilds: string[];
    content: UserContent[];
}

type GuildDataType = {
    _id: Types.ObjectId;
    owner_id: string;
    guild_id: string;
    guild_name: string;
    icon: string;
    created_at: Date;
    created_timestamp: Date;
    credit: number;
    eula: boolean;
    content: GuildContent[];
}

type ExistingEntryType = {
    tokens: Token[];
    count: number;
}

type TokenMapType = {
    guild: Types.ObjectId;
    author: {
        user_id: string;
        username: string;
        global_name: string;
        message: string;
        message_id: string;
        created_timestamp: Date;
    }[];

    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: Date;
    gpt_response: string | null;
    tokens: Token[];
    expires?: Date;
}

export { UserDataType, ExistingEntryType, GuildDataType, TokenMapType };
//////////////////////JWT////////////////////////////

type JwtUser = {
    id: string;
}

export { JwtUser };

//////////////////////////////////////////////////////
