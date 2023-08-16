import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store';
import axios from 'axios';
import getToken from '@/utils/auth';

type initStateTyoe = {
    value: AuthStateType;
}

type AuthStateType = {
    isAuth: boolean;
    token: string | null;
    username: string;
    user_id: string;
}

const initState = {
    value: {
        isAuth: false,
        token: getToken() || null,
        username: "",
        user_id: "",
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
            return {
                value: {
                    isAuth: true,
                    token: action.payload.token,
                    username: action.payload.username,
                    user_id: action.payload.user_id,
                }
            }
        },
    },

    //     login: (state, action: PayloadAction<any>) => { //change any once setup
    //         return {
    //             value:{
    //                 isAuth: true,
    //                 token: action.payload.token,
    //                 username: action.payload.username,
    //                 user_id: action.payload.user_id,
    //             }
    //         }
    //     }
    // },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(login.pending, (state) => {
    //             state.value.loading = true;
    //         }
    //         )
    //         .addCase(login.fulfilled, (state, action) => {
    //             state.value.loading = false;
    //             state.value.isAuth = true;
    //             state.value.token = action.payload.token;
    //             state.value.username = action.payload.username;
    //             state.value.user_id = action.payload.user_id;
    //         }
    //         )
    //         .addCase(login.rejected, (state, action) => {
    //             state.value.loading = false;
    //             state.value.isAuth = false;
    //             state.value.token = null;
    //             state.value.username = "";
    //             state.value.user_id = "";
    //         }
    //         )
    // }
});

// export const login = createAsyncThunk(
//     'api/v1/auth',
//     async (data: any, thunkAPI) => {
//         try {
//             const res = await axios.get('/api/v1/auth', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//             if(res.status !== 200) {
//                 return thunkAPI.rejectWithValue(res.data)
//             }
//             const {data} = res;
//             return data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data)
//         }
//     }
// )

// export const login = () => async (dispatch: AppDispatch) => {
//     try {
//         const res = await fetch('/api/v1/auth',{
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         if(res.ok) {
//             const data = await res.json();
//             dispatch(auth.actions.loginSuccess(data))
//         }else{
//             console.log('err')
//         }
//     } catch (err) {
//         console.log(err);
        
//     }
// }
export const {logout, setUser} = auth.actions;
export default auth.reducer;
