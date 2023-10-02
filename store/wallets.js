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
      const { description, name, id } = action.payload;
      state.wallets.unshift({
        description,
        name,
        id,
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
    manipulateWalletUser: (state, action) => {
      const id = action.payload.wallet._id;
      const findedwalletIndex = state.wallets.findIndex((e) => e._id === id);
      const walletUsers = action.payload.wallet?.users;
      walletUsers;
      state.wallets[findedwalletIndex] = {
        ...state.wallets[findedwalletIndex],
        users: walletUsers,
      };
    },
  },
});

export const setWallets = walletsSlice.actions.setWallets;
export const addWallet = walletsSlice.actions.addWallet;
export const deleteWallet = walletsSlice.actions.deleteWallet;
export const updateWallet = walletsSlice.actions.updateWallet;
export const manipulateWalletUser = walletsSlice.actions.manipulateWalletUser;

export default walletsSlice.reducer;
