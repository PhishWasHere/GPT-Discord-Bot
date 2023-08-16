
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
    created_timestamp: number;
    gpt_response: string | null;
    tokens: Token[];
}

interface UserProfile { // used for direct mesasge for users
    user_id: string;
    username: string;
    content: Content[];
    created_at: Date;
}

export { Token, Content, UserProfile };
//////////////////////////////////////////////////////

//////////////////Guilds/////////////////////

interface Author {
    user_id: string;
    username: string;
    global_name: string;
    message: string;
    message_id: string;
    created_timestamp: number;
}

interface GuildContent {
    author: Author[];
    gpt_response: string | null;
    tokens: Token[];
}

interface Guild { // used for guilds/servers
    guild_id: string;
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
