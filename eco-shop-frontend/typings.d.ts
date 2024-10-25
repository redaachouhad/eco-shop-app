export interface Product {
  productId?: number;
  productCategoryId: number;
  productTitle: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productRemainingQuantity: number;
  productRating: number;
}

export interface Category {
  categoryId?: number;
  categoryName: string;
}

export interface Property {
  propertyId?: number;
  propertyProductId?: number;
  propertyName: string;
  propertyValue: string;
}

export interface ProductDto {
  product: Product;
  category: Category;
  properties: Property[];
}

export interface ProductDtoWithoutCategory {
  product: Product;
  properties: Property[];
}

export interface ProductDtoWithoutProperties {
  product: Product;
  category: Category;
}

export interface OneProductDtoWithReviews {
  productDto: ProductDto;
  reviews: Review[];
}

export interface Review {
  reviewId?: number;
  reviewUserId: number;
  reviewProductId: number;
  reviewTitle: string;
  reviewDescription: string;
  reviewRating: number;
  reviewVerifiedPurchase: boolean;
  reviewCreationDate: Date;
}

export interface UserEntity {
  userId?: number;
  userEmail: string;
  preferredUsername: string;
  givenName: string;
  familyName: string;
}

export interface Cart {
  cartId?: number;
  userId?: number;
  productId: number;
  selectedProductQuantity: number;
  pricePerUnit: number;
}

export interface CartWithProduct {
  cart: Cart;
  product: Product;
}

export interface CartDto {
  cart: Cart;
  selectedProducts: SelectedProduct[];
}

export interface Order {
  orderId?: number;
  userId: number;
  orderDateCreation?: Date;
  orderTotalAmount: number;
}

export interface BoughtProduct {
  boughtProductId?: number;
  orderId?: number;
  productId: number;
  boughtProductQuantity: number;
  boughtProductPricePerUnit: number;
  productName: string;
}

export interface OrderDto {
  order: Order;
  boughtProducts: BoughtProduct[];
}

export interface FilterOfProduct {
  size: number;
  page: number;
  filterMinPrice: number;
  filterMaxPrice: number;
  filterCategory: number;
  filterSortedBy: number;
}

export interface ReviewWithUsers {
  userEntity: UserEntity;
  review: Review;
}

export interface OneProductDtoWithReviewsAndUsers {
  productDto: ProductDto;
  reviewWithUsersList: ReviewWithUsers[];
}

export interface OrderWithUserWithBoughtProducts {
  order: Order;
  boughtProducts: BoughtProduct[];
  userEntity: UserEntity;
}

export interface ProductWithBoughtProduct {
  product: Product;
  boughtProduct: BoughtProduct;
}
