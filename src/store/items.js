import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const addToCartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    increment: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let cartItems = [...state.items, {...action.payload}];
      state.items = cartItems
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = addToCartSlice.actions

export default addToCartSlice.reducer