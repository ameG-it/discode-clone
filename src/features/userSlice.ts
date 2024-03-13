import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../Type";

const initialState: initialUserState={
    user:null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
            state.user = null;
        }
    },
  });

  export const {login ,logout} = userSlice.actions;
  export default userSlice.reducer;