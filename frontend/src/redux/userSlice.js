import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        isLoading: true,
        currentCity: null,
        currentState: null,
        currentAddress: null,
        shopsInMyCity: null,
        itemsInMyCity: null,
        cartItems: []
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData = action.payload;
            state.isLoading = false;
        },
        setCurrentCity:(state, action)=>{
            state.currentCity = action.payload;
        },
        setCurrentState:(state, action)=>{
            state.currentState = action.payload;
        },
        setCurrentAddress:(state, action)=>{
            state.currentAddress = action.payload;
        },
        setShopsInMyCity:(state, action)=>{
            state.shopsInMyCity = action.payload;
        },
        setItemsInMyCity:(state, action)=>{
            state.itemsInMyCity = action.payload;
        },
        addToCart:(state,action)=>{
            const cartItem = action.payload;
            const existingItem = state.cartItems.find(i => i._id == cartItem.id);
            if(existingItem){
                existingItem += cartItem.quantity;
            }else{
                state.cartItems.push(cartItem)
            }
        }
    }
})

export const {setUserData, setCurrentCity,setCurrentState, setCurrentAddress, setShopsInMyCity, setItemsInMyCity, addToCart} = userSlice.actions
export default userSlice.reducer