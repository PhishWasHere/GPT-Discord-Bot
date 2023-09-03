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
    username: string | null;   
    user_id: string | null;
    guild_data: GuildDataType[];
}

const initState = {
    value: {
        isAuth: false,
        token: getToken() || null,
        username: null,
        user_id: null,
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
                    username: action.payload.username,
                    user_id: action.payload.user_id,
                    guild_data: action.payload.guildData,
                }
            }
        },
    },
})

export const {logout, setUser} = auth.actions;
export default auth.reducer;
