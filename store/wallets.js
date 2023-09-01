import { createSlice } from "@reduxjs/toolkit";

const walletsSlice = createSlice({
  name: "wallets",
  initialState: {
    wallets: [],
  },
  reducers: {
    setWallets: (state, action) => {
      state.wallets = action.payload.reverse();
    },
    addWallet: (state, action) => {
      const { description, amount, date } = action.payload;
      state.wallets.unshift({
        description,
        amount,
        date,
      });
    },
    deleteWallet: (state, action) => {
      const id = action.payload.id;
      const updatablewalletIndex = state.wallets.findIndex(
        (wallet) => wallet.id === id
      );
      state.wallets.splice(updatablewalletIndex, 1);
    },
    updateWallet: (state, action) => {
      const id = action.payload.id;
      const findedwalletIndex = state.wallets.findIndex((e) => e.id === id);
      state.wallets[findedwalletIndex] = {
        ...state.wallets[findedwalletIndex],
        ...action.payload.wallet,
      };
    },
  },
});

export const setWallets = walletsSlice.actions.setWallets;
export const addWallet = walletsSlice.actions.addWallet;
export const deleteWallet = walletsSlice.actions.deleteWallet;
export const updateWallet = walletsSlice.actions.updateWallet;

export default walletsSlice.reducer;
