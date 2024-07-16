import { configureStore } from "@reduxjs/toolkit";
import cartWithProductReducers from "./features/cartWithProduct/cartWithProduct";
import filterOfProductReducers from "./features/filterOfProduct/filterOfProduct";
import listIdsOfCartToDeleteReducers from "./features/listIdsOfCartToDelete/listIdsOfCartToDelete";
import listOfCategoriesReducers from "./features/listOfCatgories/listOfCategories";
import listOfProductsReducers from "./features/listOfProducts/listOfProducts";
import listOfPropertiesPerProductReducers from "./features/listOfPropertiesPerProduct/listOfPropertiesPerProduct";
import pageNumberReducers from "./features/numberOfPage/numberOfPage";
import selectedProductReducers from "./features/selectedProduct/selectedProduct";
import showLeftMenuReducer from "./features/showLeftMenu/showLeftMenu";
import totalPriceCartReducers from "./features/totalPriceCart/totalPriceCart";
export const store = configureStore({
  reducer: {
    showLeftMenu: showLeftMenuReducer,
    listOfCategories: listOfCategoriesReducers,
    listOfPropertiesPerProduct: listOfPropertiesPerProductReducers,
    listOfProducts: listOfProductsReducers,
    filterOfProduct: filterOfProductReducers,
    pageNumber: pageNumberReducers,
    selectedProduct: selectedProductReducers,
    cartWithProduct: cartWithProductReducers,
    totalPriceCart: totalPriceCartReducers,
    listIdsOfCartToDelete: listIdsOfCartToDeleteReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
