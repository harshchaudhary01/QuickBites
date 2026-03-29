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
        cartItems: [],
        totalAmount: 0,
        myOrders: null,
        searchItems:null
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
            const existingItem = state.cartItems.find(i => i._id === cartItem._id || i._id === cartItem.id || i.id === cartItem.id);
            if(existingItem){
                existingItem.quantity = (existingItem.quantity || 0) + (cartItem.quantity || 1);
            }else{
                state.cartItems.push({
                    ...cartItem,
                    quantity: cartItem.quantity || 1
                });
            }
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum + i.price * i.quantity, 0)
        },
        updateQuantity: (state,action)=>{
            const {id, quantity} = action.payload;
            const item = state.cartItems.find(i=>i.id == id) 
            if(item){
                item.quantity = quantity;
            }
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum + i.price * i.quantity, 0)
        },
        removeCartItem:(state,action)=>{
            state.cartItems = state.cartItems.filter(i=>i.id !== action.payload)
            state.totalAmount = state.cartItems.reduce((sum,i)=>sum + i.price * i.quantity, 0)
        },

        setMyOrders:(state,action)=>{
            state.myOrders = action.payload
        },
        addMyOrder:(state,action)=>{
            state.myOrders = [action.payload, ...state.myOrders]
        },
        updateOrderStatus:(state, action)=>{
            const {orderId, shopId, status} = action.payload;
            const order = state.myOrders.find(o=>o._id == orderId)
            if(order){
                if(order.shopOrders && order.shopOrders.shop._id == shopId){
                    order.shopOrders.status = status;
                }
            }
        },
        setSearchItems:(state,action)=>{
            state.searchItems = action.payload
        }
    }
})

export const {setUserData, setCurrentCity,setCurrentState, setSearchItems ,setCurrentAddress, setShopsInMyCity, setItemsInMyCity, addToCart, updateQuantity, removeCartItem, setMyOrders, addMyOrder,updateOrderStatus} = userSlice.actions
export default userSlice.reducer