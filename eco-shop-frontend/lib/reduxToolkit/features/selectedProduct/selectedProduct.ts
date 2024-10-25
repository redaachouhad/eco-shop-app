import {
  OneProductDtoWithReviewsAndUsers,
  ProductDto,
  ReviewWithUsers,
} from "@ext/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProducts {
  value: OneProductDtoWithReviewsAndUsers;
}

// Define the initial state using that type
const initialState: SelectedProducts = {
  value: {
    productDto: {
      product: {
        productId: 0,
        productCategoryId: 0,
        productTitle: "",
        productDescription: "",
        productImage: "",
        productPrice: 0,
        productRating: 0,
        productRemainingQuantity: 0,
      },
      category: {
        categoryId: 0,
        categoryName: "",
      },
      properties: [],
    },
    reviewWithUsersList: [],
  },
};

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    setSelectedProductFct: (
      state,
      action: PayloadAction<OneProductDtoWithReviewsAndUsers>
    ) => {
      state.value = action.payload;
    },

    setSelectedProductReviewWithUsersListFct(
      state,
      action: PayloadAction<ReviewWithUsers[]>
    ) {
      state.value.reviewWithUsersList = action.payload;
    },

    setSelectedProductProductDtoFct: (
      state,
      action: PayloadAction<ProductDto>
    ) => {
      state.value.productDto = action.payload;
    },
  },
});

export const {
  setSelectedProductFct,
  setSelectedProductReviewWithUsersListFct,
  setSelectedProductProductDtoFct,
} = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
