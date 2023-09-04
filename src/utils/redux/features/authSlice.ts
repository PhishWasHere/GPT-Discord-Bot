import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import getToken from '@/utils/auth';

type initStateTyoe = {
    value: AuthStateType;
}

type GuildDataType = {
    guild_id: string;
    guild_name: string;
    guild_icon: string;
    eula: boolean;
}

type AuthStateType = {
    isAuth: boolean;
    token: string | null;
    user_id: string | null;
    username: string | null;
    avatar: string | null;
    eula: boolean;   
    guild_data: GuildDataType[];
}

const initState = {
    value: {
        isAuth: false,
        token: getToken() || null,
        user_id: null,
        username: null,
        avatar: null,
        eula: false,
        guild_data: [{
            guild_id: '',
            guild_name: '',
            guild_icon: '',
            eula: false,
        }],
    } as AuthStateType
} as initStateTyoe

const auth = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        logout: () => {
            return initState
        },

        setUser: (state, action: PayloadAction<any>) => {
            return{
                value: {
                    isAuth: true,
                    token: action.payload.token,
                    user_id: action.payload.user_id,
                    username: action.payload.username,
                    avatar: action.payload.avatar,
                    eula: action.payload.eula,
                    guild_data: action.payload.guildData,
                }
            }
        },
    },
})

export const {logout, setUser} = auth.actions;
export default auth.reducer;