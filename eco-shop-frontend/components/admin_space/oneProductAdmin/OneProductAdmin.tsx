"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { storage } from "@ext/lib/firebase/firebase";
import { setFilterOfProductFct } from "@ext/lib/reduxToolkit/features/filterOfProduct/filterOfProduct";
import { setSelectedProductFct } from "@ext/lib/reduxToolkit/features/selectedProduct/selectedProduct";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import {
  addProductToCart,
  addReviews,
  deleteOneProductByProductId,
  getOneProductByProductId,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import {
  Cart,
  FilterOfProduct,
  OneProductDtoWithReviewsAndUsers,
  Review,
  ReviewWithUsers,
  UserEntity,
} from "@ext/typings";
import { Rating } from "@mui/material";
import { deleteObject, ref } from "firebase/storage";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { BiSolidMessage } from "react-icons/bi";
import {
  FaArrowCircleUp,
  FaArrowLeft,
  FaEdit,
  FaMinus,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import ReviewAboutProduct from "./ReviewAboutProduct";

function OneProductAdmin({ pathArg }: { pathArg: string }) {
  const [showAddReview, setShowAddReview] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const router = useRouter();
  const pathName = usePathname().split("/");
  const selectedId: number = Number(pathName[4]);
  const [visualizeProduct, setVisualizeProduct] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [addToCartButton, setAddToCartButton] = useState<boolean>(false);
  const [moveTo, setMoveTo] = useState<boolean>(false);
  const selectedProduct: OneProductDtoWithReviewsAndUsers = useAppSelector(
    (state) => state.selectedProduct.value
  );

  const filter: FilterOfProduct = useAppSelector(
    (state) => state.filterOfProduct.value
  );
  const fetchOneProduct = async () => {
    setVisualizeProduct(false);
    setIsPending(true);
    const oneProduct: OneProductDtoWithReviewsAndUsers =
      (await getOneProductByProductId(
        selectedId,
        1
      )) as OneProductDtoWithReviewsAndUsers;

    if (!oneProduct) {
      setVisualizeProduct(false);
      setIsPending(false);
      return;
    }

    dispatch(setSelectedProductFct(oneProduct));

    setVisualizeProduct(true);

    return;
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchOneProduct();
    }
  }, [(session as any)?.accessToken]);
  const dispatch = useAppDispatch();

  const onClickDeleteProduct = async () => {
    const storageRef = ref(
      storage,
      selectedProduct?.productDto.product.productImage as string
    );
    await deleteObject(storageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        toast.error("Error in deleting Image");
        return null;
      });
    await deleteOneProductByProductId(selectedId);
    const newFilter: FilterOfProduct = {
      ...filter,
      page: 0,
    };
    dispatch(setFilterOfProductFct(newFilter));
    router.push("/admin_space/products/allProducts?page=1");
  };

  const [reviewToAdd, setReviewToAdd] = useState<Review>({
    reviewUserId: 0,
    reviewProductId: 0,
    reviewTitle: "",
    reviewDescription: "",
    reviewRating: 0,
    reviewVerifiedPurchase: false,
    reviewCreationDate: new Date(),
  });

  const onChangeReviewInput = (e: ChangeEvent<HTMLInputElement>) => {
    setReviewToAdd((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeReviewTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewToAdd((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeReviewRating = (
    event: SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    setReviewToAdd((prevValue) => {
      return {
        ...prevValue,
        reviewRating: newValue as number,
      };
    });
  };

  const onClickPublish = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSpinPublish(true);
    if (reviewToAdd.reviewTitle === "") {
      toast.error("Please provide the title of the review");
      setSpinPublish(false);
      return;
    }

    if (reviewToAdd.reviewDescription === "") {
      toast.error("Please provide the description of the review");
      setSpinPublish(false);
      return;
    }

    if (reviewToAdd.reviewRating === 0) {
      toast.error("Please provide the rating value");
      setSpinPublish(false);
      return;
    }

    await addReviews({
      productId: selectedProduct?.productDto.product.productId as number,
      userEmail: session?.user?.email as string,
      review: reviewToAdd,
    });

    const oneProduct: OneProductDtoWithReviewsAndUsers =
      (await getOneProductByProductId(
        selectedId,
        1
      )) as OneProductDtoWithReviewsAndUsers;

    dispatch(setSelectedProductFct(oneProduct));

    setReviewToAdd({
      reviewUserId: 0,
      reviewProductId: 0,
      reviewTitle: "",
      reviewDescription: "",
      reviewRating: 0,
      reviewVerifiedPurchase: false,
      reviewCreationDate: new Date(),
    });
    setSpinPublish(false);
    return;
  };

  const changingFilter = async () => {
    const newFilter: FilterOfProduct = {
      size: 10,
      page: 0,
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterCategory: 0,
      filterSortedBy: 0,
    };
    dispatch(setFilterOfProductFct(newFilter));
  };

  const [quantityOfProduct, setQuantityOfProduct] = useState<number>(0);

  const [userEntity, setUser] = useState<UserEntity>();

  useEffect(() => {
    if ((session as any)?.accessToken) {
      const result_session = jwtDecode((session as any)?.accessToken as string);
      const user: UserEntity = {
        userEmail: (result_session as any)?.email as string,
        preferredUsername: (result_session as any)
          ?.preferred_username as string,
        givenName: (result_session as any)?.given_name as string,
        familyName: (result_session as any)?.family_name as string,
      };
      setUser(user);
    }
  }, [(session as any)?.accessToken]);

  const [spinPublish, setSpinPublish] = useState<boolean>(false);

  const onClickAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMoveTo(true);
    if (quantityOfProduct === 0) {
      toast.error("Please select a quantity of the product > 0");
      setMoveTo(false);
      return;
    }
    const productInCart: Cart = {
      productId: selectedProduct.productDto.product.productId as number,
      selectedProductQuantity: quantityOfProduct as number,
      pricePerUnit: selectedProduct.productDto.product.productPrice as number,
    };

    if (
      selectedProduct.productDto.product.productRemainingQuantity <
      productInCart.selectedProductQuantity
    ) {
      toast.error("Please ensure that: chosen quantity >= remaining quantity");
      setMoveTo(false);
      return;
    }

    const response = await addProductToCart(
      userEntity?.userEmail as string,
      productInCart
    );
    const responseIndex = response as number;
    if (responseIndex == 0) {
      toast.error("This product doesn't exist");
      setMoveTo(false);
      return;
    } else if (responseIndex == 2) {
      toast.error("Please ensure that: chosen quantity >= remaining quantity");
      setMoveTo(false);
      return;
    }
    toast.success("the product is added to cart successfully");
    router.push("/client_space/cart");
    return;
  };

  return visualizeProduct ? (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="w-full flex flex-row justify-start">
        <p
          onClick={async () => {
            await changingFilter();
            router.push("/" + pathArg + "/products/allProducts?page=1");
          }}
          className="text-white text-lg font-semibold flex flex-row items-center gap-2 hover:underline cursor-pointer w-fit"
        >
          <FaArrowLeft />
          <span>Go back</span>
        </p>
      </div>
      <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold">
        Product Visualisation
      </h1>
      <div className="flex flex-col w-full p-4 bg-[rgba(0,0,0,0.6)] rounded-md">
        {pathName[1] === "admin_space" && (
          <div className="flex flex-row items-center justify-between sm:justify-end gap-4 text-white mb-6">
            <button
              className="p-1 bg-[rgba(68,136,156,0.8)] rounded-md cursor-pointer shadow-sm shadow-black flex flex-row items-center gap-1"
              onClick={() =>
                router.push(
                  "/admin_space/products/editOneProduct/" + selectedId
                )
              }
            >
              <FaEdit fontSize={22} />
              <span>Edit Product</span>
            </button>

            <div className="flex flex-col relative">
              <button
                onClick={() => setShowDeleteProduct(true)}
                className="p-1 bg-red-600 rounded-md cursor-pointer shadow-sm shadow-black flex flex-row items-center gap-1"
              >
                <MdDeleteForever fontSize={22} />
                <span> Delete Product</span>
              </button>
              {showDeleteProduct && (
                <div className="w-72 flex flex-col bg-[rgba(0,0,0,0.9)] text-white p-2 absolute translate-y-10 rounded-md right-0 gap-3">
                  <p>You want to delete this product ? (Please be sure !)</p>
                  <div className="flex flex-row justify-between items-center">
                    <div
                      onClick={() => setShowDeleteProduct(false)}
                      className="text-white font-semibold bg-red-500 px-3 py-0.5 rounded-md cursor-pointer"
                    >
                      <p>No</p>
                    </div>
                    <div
                      onClick={onClickDeleteProduct}
                      className="text-white font-semibold bg-blue-500 px-3 py-0.5 rounded-md cursor-pointer"
                    >
                      <p>Yes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {pathName[1] === "client_space" && (
          <div className="flex flex-row items-center justify-between sm:justify-end gap-4 text-white mb-6">
            <button
              onClick={onClickAddToCart}
              className="p-1 bg-[rgba(68,136,156,0.8)] rounded-md cursor-pointer shadow-sm shadow-black flex flex-row items-center gap-1"
            >
              {moveTo ? (
                <ImSpinner9 fontSize={22} className="animate-spin" />
              ) : (
                <FaPlus fontSize={22} />
              )}
              <span>Add to cart</span>
            </button>
          </div>
        )}
        <div className="w-full flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          <div className="flex-shrink-0">
            <Image
              src={selectedProduct?.productDto.product.productImage as string}
              alt=""
              width={100}
              height={100}
              className="w-96 rounded-md"
              unoptimized={true}
              priority={true}
            />
          </div>
          <div className="flex flex-col text-white justify-start gap-5 ">
            <h1 className="text-2xl xl:text-3xl text-[rgba(255,255,255)]">
              {selectedProduct?.productDto.product.productTitle}
            </h1>
            <div className="flex flex-row justify-between sm:justify-start gap-2 sm:gap-6 items-center">
              <div className="flex flex-row items-center gap-1">
                <Rating
                  name="read-only"
                  value={
                    selectedProduct.productDto.product.productRating as number
                  }
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "white",
                    },
                  }}
                  className="text-2xl"
                />
                <p className="text-xs sm:text-sm text-gray-200">
                  {selectedProduct.productDto.product.productRating}
                  {/* {(Math.round(totalRateFromReviews * 10) / 10) as number} */}
                </p>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 flex flex-row items-center gap-1">
                <BiSolidMessage fontSize={20} />
                <p>{selectedProduct.reviewWithUsersList.length} reviews</p>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 flex flex-row items-center gap-1">
                <IoBagHandleSharp fontSize={20} />
                <p>320 sales</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-yellow-500 ">
              {" "}
              {selectedProduct?.productDto.product.productPrice} ${" "}
              <span className="text-sm lg:text-lg font-normal text-white">
                / per unit
              </span>
            </p>
            <p className="flex flex-row items-center gap-2">
              <span className="text-[rgba(255,255,255)] text-xl font-semibold">
                Remaining Quantity:{" "}
              </span>
              <br />
              <span className="text-green-500 text-xl font-bold">
                {selectedProduct?.productDto.product.productRemainingQuantity}
              </span>
              <span>in the stock</span>
            </p>

            {pathArg == "client_space" && (
              <div className="flex flex-col gap-2">
                <span className="text-[rgba(255,255,255)] text-xl font-semibold">
                  Chosen Quantity:{" "}
                </span>
                <div className="flex flex-row rounded-md overflow-hidden w-fit">
                  <button
                    onClick={() => {
                      if (quantityOfProduct > 0) {
                        setQuantityOfProduct(quantityOfProduct - 1);
                      }
                    }}
                    className="p-2 bg-[rgba(74,140,160,0.69)] flex justify-center items-center cursor-pointer"
                  >
                    <FaMinus size={15} />
                  </button>
                  <input
                    type="number"
                    value={quantityOfProduct}
                    step={1}
                    name=""
                    id=""
                    className="text-black w-32 md:w-44 border border-white outline-none p-1 text-md font-bold"
                    readOnly
                  />
                  <button
                    onClick={() => {
                      setQuantityOfProduct(quantityOfProduct + 1);
                    }}
                    className="p-2 bg-[rgba(74,140,160,0.69)] flex justify-center items-center cursor-pointer"
                  >
                    <FaPlus size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <div>
          <div className="text-white">
            <span className="text-2xl font-semibold">Description: </span>
            <br />
            <span className="font-light">
              {selectedProduct?.productDto.product.productDescription}
            </span>
          </div>
          <br />
          <div className="flex flex-col text-white">
            <span className="text-2xl font-semibold">Properties: </span>
            <ul className="list-disc list-inside font-light">
              {selectedProduct?.productDto.properties.map((item, index) => {
                return (
                  <li key={index} className="font-light">
                    <strong className="font-semibold">
                      {item.propertyName}
                    </strong>
                    : {item.propertyValue}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <br />
        <div className="flex flex-col text-white w-full rounded-md gap-2">
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Review:</p>
            <button
              onClick={() => setShowAddReview(true)}
              className="flex flex-row items-center justify-center gap-2 bg-green-700 p-1 rounded-md shadow-md shadow-black"
            >
              <FaPlusCircle />
              <p>Add review</p>
            </button>
          </div>

          <div className="w-full flex flex-col gap-6">
            {showAddReview && (
              <div className="p-2 rounded-md text-white border border-white flex flex-col gap-2 bg-[rgba(0,0,0,0.4)]">
                <div className="w-full flex flex-row justify-end">
                  <p
                    className="flex flex-row items-center gap-2 hover:underline cursor-pointer"
                    onClick={() => setShowAddReview(false)}
                  >
                    <GrClose />

                    <span>Close</span>
                  </p>
                </div>
                <p className="font-bold">Review title</p>
                <input
                  type="text"
                  maxLength={100}
                  onChange={onChangeReviewInput}
                  name="reviewTitle"
                  value={reviewToAdd.reviewTitle}
                  className="text-white rounded-md bg-transparent border border-white p-0.5 text-sm"
                />
                <div className="w-full text-sm text-gray-400 flex flex-row justify-end">
                  <p>{reviewToAdd.reviewTitle.length}/100 characters</p>
                </div>
                <p className="font-bold">Review description:</p>
                <textarea
                  name="reviewDescription"
                  onChange={onChangeReviewTextArea}
                  value={reviewToAdd.reviewDescription}
                  maxLength={500}
                  className="w-full outline-none resize-none text-white rounded-md bg-transparent border border-white p-1 h-40 text-sm"
                />
                <div className="w-full text-sm text-gray-400 flex flex-row justify-end">
                  <p>{reviewToAdd.reviewDescription.length}/500 characters</p>
                </div>
                <p className="font-bold">Rating:</p>
                <Rating
                  name="reviewRating"
                  value={reviewToAdd.reviewRating}
                  onChange={(e, v) => onChangeReviewRating(e, v)}
                  precision={0.5}
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "white",
                    },
                  }}
                  className="text-3xl"
                />
                <div className="w-full flex flex-row justify-end">
                  <button
                    onClick={onClickPublish}
                    className="p-1 bg-blue-600 rounded-md text-sm flex flex-row items-center gap-1"
                  >
                    {spinPublish ? (
                      <ImSpinner9 className="animate-spin" />
                    ) : (
                      <FaArrowCircleUp />
                    )}
                    <p>Publish</p>
                  </button>
                </div>
              </div>
            )}
            {selectedProduct?.reviewWithUsersList.length !== 0 && <br />}
            {selectedProduct?.reviewWithUsersList.length !== 0 ? (
              selectedProduct?.reviewWithUsersList.map(
                (item: ReviewWithUsers, index: number) => {
                  return (
                    <>
                      <ReviewAboutProduct
                        key={index}
                        item={item}
                        userEntity={userEntity as UserEntity}
                        selectedId={selectedId}
                      />
                      <br />
                    </>
                  );
                }
              )
            ) : (
              <div className="text-white w-full text-sm flex justify-center p-4">
                <p>There is no review for now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : isPending ? (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll ">
      <div className="flex flex-col justify-center items-center w-full h-full p-4 rounded-md bg-[rgba(0,0,0,0.6)] ">
        <GradientCircularProgress />
      </div>
    </div>
  ) : (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll ">
      <div className="flex flex-col justify-center items-center w-full h-full p-4 rounded-md bg-[rgba(0,0,0,0.6)] ">
        <p className="text-white text-xl sm:text-3xl">Product Not Found</p>
        <br />
        <p className="text-white">Please go to the page of products</p>
        <br />
        <button
          onClick={() => {
            const newFilter: FilterOfProduct = {
              ...filter,
              page: 0,
            };
            dispatch(setFilterOfProductFct(newFilter));
            router.push("/admin_space/products/allProducts?page=1");
          }}
          className="text-white p-2 bg-blue-500 rounded-md shadow-sm shadow-black flex flex-row items-center gap-2"
        >
          <FaArrowLeft />
          <p>Products Pages</p>
        </button>
      </div>
    </div>
  );
}

export default OneProductAdmin;
