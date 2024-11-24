import { createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';

const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error('Error loading cart from localStorage:', err);
        return [];
    }
};

const saveCartToStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (err) {
        console.error('Error saving cart to localStorage:', err);
    }
};

const cartSlice = createSlice({
    name: "mycart",
    initialState: {
        cart: loadCartFromStorage()
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (existingItem) {
                message.error("This product is already added!");
            } else {
                state.cart.push(action.payload);
                saveCartToStorage(state.cart);
                message.success("Product added!");
            }
        },
        qntyInc: (state, action) => {
            const item = state.cart.find(item => item._id === action.payload.id);
            if (item) {
                item.qnty++;
                saveCartToStorage(state.cart);
            }
        },
        qntyDec: (state, action) => {
            const item = state.cart.find(item => item._id === action.payload.id);
            if (item) {
                if (item.qnty > 1) {
                    item.qnty--;
                    saveCartToStorage(state.cart);
                } else {
                    message.error("Quantity cannot be less than 1");
                }
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload.id);
            saveCartToStorage(state.cart);
            message.success("Product removed from cart");
        }
    }
});

export const { addToCart, qntyInc, qntyDec, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;