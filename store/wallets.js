import { createSlice } from "@reduxjs/toolkit";

const walletsSlice = createSlice({
  name: "wallets",
  initialState: {
    wallets: [],
  },
  reducers: {
    setWallets: (state, action) => {
      const wallets = JSON.parse(JSON.stringify(action.payload));
      state.wallets = wallets.reverse();
    },
    addWallet: (state, action) => {
      state.wallets.unshift(action.payload);
    },
    deleteWallet: (state, action) => {
      const id = action.payload.id;
      state.wallets = state.wallets.filter((wallet) => wallet._id !== id);
    },
    updateWallet: (state, action) => {
      const updated = action.payload.wallet;
      const index = state.wallets.findIndex((w) => w._id === updated._id);
      if (index !== -1) {
        state.wallets[index] = { ...state.wallets[index], ...updated };
      }
    },
    manipulateWalletUser: (state, action) => {
      const updated = action.payload.wallet;
      const index = state.wallets.findIndex((w) => w._id === updated._id);
      if (index !== -1) {
        state.wallets[index] = {
          ...state.wallets[index],
          users: updated.users,
        };
      }
    },
  },
});

export const setWallets = walletsSlice.actions.setWallets;
export const addWallet = walletsSlice.actions.addWallet;
export const deleteWallet = walletsSlice.actions.deleteWallet;
export const updateWallet = walletsSlice.actions.updateWallet;
export const manipulateWalletUser = walletsSlice.actions.manipulateWalletUser;

export default walletsSlice.reducer;
