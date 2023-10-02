import { createSelector } from "reselect";

const selectWalletsState = (state) => state.walletsState;
const selectUsersState = (state) => state.authState;

export const selectWalletUsers = (walletId) =>
  createSelector([selectWalletsState], (walletsState) => {
    const wallet = walletsState.wallets.find((w) => w._id === walletId);
    return wallet ? wallet.users : [];
  });

export const selectActiveWallet = () =>
  createSelector([selectUsersState], (usersState) => {
    return usersState.activeWallet;
  });
