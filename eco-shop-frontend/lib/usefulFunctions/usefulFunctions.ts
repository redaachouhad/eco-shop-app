import {
  BoughtProduct,
  Cart,
  CartWithProduct,
  Category,
  FilterOfProduct,
  OneProductDtoWithReviewsAndUsers,
  Order,
  OrderWithUserWithBoughtProducts,
  ProductDto,
  ProductDtoWithoutCategory,
  ProductDtoWithoutProperties,
  Review,
  ReviewWithUsers,
  UserEntity,
} from "@ext/typings";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export async function addProductToCart(email: string, cart: Cart) {
  try {
    const response = await axiosInstance.post("/carts/addProductToCart", cart, {
      params: {
        userEmail: email,
      },
    });
    return response.data as number;
  } catch (error) {
    toast.error("Error in adding product to cart");
    return;
  }
}

//

interface CartWithProductWithTotalAmount {
  cartWithProduct: CartWithProduct[];
  amount: number;
}

export async function deleteListOfProductOfCart(
  cartWithProduct: CartWithProduct[]
) {
  const response = await axiosInstance.post(
    "/orders/makingOrder",
    cartWithProduct
  );
}

//

export async function deleteProductFromCart(cartId: number) {
  const response = await axiosInstance.delete("/carts/deleteProductOfCart", {
    params: {
      cartId: cartId,
    },
  });
  toast.success("Product deleted successfully from cart");
}

//
export async function getCartWithProductsByUserEmail(email: string) {
  const response = await axiosInstance.get(
    "/carts/getCartWithProductsByUserEmail",
    {
      params: {
        userEmail: email,
      },
    }
  );
  const selectedProduct: CartWithProduct[] = response.data;
  return selectedProduct;
}

//

export async function addNewCategory(category: Category) {
  try {
    const response = await axiosInstance.post(
      "/products/addOneCategory",
      category
    );
    if (response.status === 200) {
      return { success: true, message: "Category added successfully" };
    } else {
      return {
        success: false,
        message: `Failed to add category: ${response.data}`,
      };
    }
  } catch (error) {
    return { success: false, message: "Error adding category" };
  }
}

//

export async function deleteCategory(categoryId: number) {
  try {
    const response = await axiosInstance.delete("/products/deleteOneCategory", {
      params: {
        categoryId: categoryId,
      },
    });
    if (response.status === 200) {
      return { success: true, message: response.data };
    } else {
      return {
        success: false,
        message: `Failed to add category: ${response.data}`,
      };
    }
  } catch (error) {
    return { success: false, message: "Error adding category" };
  }
}

//
export async function getCategories() {
  const response = await axiosInstance.get("/products/getAllCategories");
  const categories: Category[] = response.data;
  return categories;
}

//

export async function getAllOrder() {
  const response = await axiosInstance.get("/orders/getAllOrderAdmin");
  return response.data as Order[];
}

//
export async function getOneOrderByOrderIdWithDetails(orderId: number) {
  const response = await axiosInstance.get(
    "/orders/getOneOrderByOrderIdWithDetails",
    {
      params: {
        orderId: orderId,
      },
    }
  );

  const order: Order = response.data.order as Order;
  const boughtProductList: BoughtProduct[] = response.data
    .boughtProductList as BoughtProduct[];
  const userEntity: UserEntity = response.data.userEntity as UserEntity;
  const createdObjects: OrderWithUserWithBoughtProducts = {
    order: order,
    boughtProducts: boughtProductList,
    userEntity: userEntity,
  } as OrderWithUserWithBoughtProducts;

  return createdObjects;
}
//
export async function getOrdersByUserEmail(
  userEmail: string,
  typeUser: string
) {
  let response;
  if (typeUser === "client_space") {
    response = await axiosInstance.get("/orders/getOrdersByUserId", {
      params: {
        userEmail: userEmail,
      },
    });
  } else {
    response = await axiosInstance.get("/orders/getAllOrderAdmin");
  }

  return response.data as Order[];
}

//

export async function addOneProduct(
  productDtoWithoutCategory: ProductDtoWithoutCategory
) {
  try {
    const response = await axiosInstance.post(
      "/products/addOneProduct",
      productDtoWithoutCategory
    );
    const data = response.data;
    return data;
  } catch (error) {
    toast.error("Error in adding product, please try again");
  }
}
//
export async function deleteOneProductByProductId(id: number) {
  const response = await axiosInstance.delete("/products/deleteOneProduct", {
    params: {
      productId: id,
    },
  });
  if (response.status === 200) {
    toast.success("The product was successfully deleted");
  } else {
    toast.error("Error in deleting the product");
  }
}

//
export async function editOneProduct(
  productDtoWithoutCategory: ProductDtoWithoutCategory
) {
  const response = await axiosInstance.put(
    "/products/editOneProduct",
    productDtoWithoutCategory
  );
  if (response.status === 200) {
    toast.success("the changes are successfully saved");
  } else {
    toast.error("Error in saving changes, please try again later");
  }
}

//
export async function getAllProductByFilter(filter: FilterOfProduct) {
  const response = await axiosInstance.post(
    "/products/getAllProductByFilter",
    filter
  );

  const productsDto: ProductDtoWithoutProperties[] = response.data.content;

  return [productsDto, response.data.totalPages as number] as [
    ProductDtoWithoutProperties[],
    number
  ];
}

//

export async function getAllProducts() {
  const response = await axiosInstance.get("/products/getAllProducts");
  const productsDto: ProductDtoWithoutProperties[] = response.data;
  return productsDto;
}

//

export async function getOneProductByProductId(id: number, form: number) {
  const response = await axiosInstance.get("/products/getOneProduct", {
    params: {
      productId: id,
      form: form,
    },
  });

  if (form === 1) {
    const result1: OneProductDtoWithReviewsAndUsers = response.data;
    return result1;
  } else {
    const result2: ProductDto = response.data;
    return result2;
  }
}

//

export async function updateRatingProduct({
  productId,
  productRating,
}: {
  productId: number;
  productRating: number;
}) {
  const response = await axiosInstance.put("/products/changingRatingProduct", {
    productId: productId,
    productRating: productRating,
  });
}

//
interface addReviewsProps {
  productId: number;
  userEmail: string;
  review: Review;
}

export async function addReviews({
  productId,
  userEmail,
  review,
}: addReviewsProps) {
  const response = await axiosInstance.post("/reviews/addReview", review, {
    params: { productId: productId, userEmail: userEmail },
  });
}

//

export async function deleteReview(id: number) {
  const response = await axiosInstance.delete("/reviews/deleteReviewById", {
    params: {
      reviewId: id,
    },
  });
  return response;
}

//
export async function editingReview(review: Review) {
  const response = await axiosInstance.put("/reviews/updateReview", review);
  return response;
}

//
export async function getAllReviews() {
  const response = await axiosInstance.get("/reviews/getAllReviews");
  const reviews: Review[] = response.data;
  return reviews;
}

//
export async function getAllReviewsByProductId(id: number) {
  const response = await axiosInstance.get(
    "/reviews/getAllReviewsByProductId",
    {
      params: {
        productId: id,
      },
    }
  );
  const reviews: ReviewWithUsers[] = response.data;
  return reviews;
}

//

export async function addUsers(userEntity: UserEntity) {
  const response = await axiosInstance.post("/users/addUser", userEntity);
}
//
