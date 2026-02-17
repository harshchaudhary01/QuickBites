import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        isLoading: true,
        city: null
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData = action.payload;
            state.isLoading = false;
        },
        setCity:(state, action)=>{
            state.city = action.payload;
        }
    }
})

export const {setUserData, setCity} = userSlice.actions
export default userSlice.reducer