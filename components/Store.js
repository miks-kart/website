import _ from "lodash";
import create from "zustand";

export const useStore = create((set) => ({
  shoppingCart: {
    priceListKarts: null,
    priceListEngines: null,
    priceListTires: null,
    priceListOptions: [],
  },
  setShoppingCart: (item) => {
    set(() => ({
      shoppingCart: item,
    }));
  },
  addToShoppingCart: (input, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: Array.isArray(state.shoppingCart[category])
          ? [...state.shoppingCart[category], { ...input, amount: 1 }]
          : { ...input, amount: 1 },
      },
    }));
  },
  removeFromShoppingCart: (input, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: Array.isArray(state.shoppingCart[category])
          ? state.shoppingCart[category].filter(
              (item) =>
                JSON.stringify(_.omit(item, "amount")) !==
                JSON.stringify(_.omit(input, "amount"))
            )
          : null,
      },
    }));
  },
  changeAmount: (input, newAmount, category) => {
    set((state) => ({
      shoppingCart: {
        ...state.shoppingCart,
        [category]: Array.isArray(state.shoppingCart[category])
          ? state.shoppingCart[category].map((item) =>
              JSON.stringify(_.omit(item, "amount")) ===
              JSON.stringify(_.omit(input, "amount"))
                ? { ...item, amount: newAmount }
                : item
            )
          : { ...state.shoppingCart[category], amount: newAmount },
      },
    }));
  },
}));
