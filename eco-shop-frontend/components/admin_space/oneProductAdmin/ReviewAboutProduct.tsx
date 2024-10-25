"use client";

import {
  setSelectedProductFct,
  setSelectedProductReviewWithUsersListFct,
} from "@ext/lib/reduxToolkit/features/selectedProduct/selectedProduct";
import { useAppDispatch } from "@ext/lib/reduxToolkit/hooks";
import { formatDateString } from "@ext/lib/usefulFunctions/formatDateString";
import {
  deleteReview,
  editingReview,
  getAllReviewsByProductId,
  getOneProductByProductId,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import {
  OneProductDtoWithReviewsAndUsers,
  Review,
  ReviewWithUsers,
  UserEntity,
} from "@ext/typings";
import { Avatar, Rating } from "@mui/material";
import { ChangeEvent, MouseEvent, SyntheticEvent, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiEdit, FiSave } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

function ReviewAboutProduct({
  item,
  userEntity,
  selectedId,
}: {
  item: ReviewWithUsers;
  userEntity: UserEntity;
  selectedId: number;
}) {
  const dispatch = useAppDispatch();

  const onClickDeleteReview = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSpinDelete(true);
    const response = await deleteReview(item?.review.reviewId as number);
    if (response.status === 200) {
      toast.success("your review was successfully deleted");
      const oneProduct: OneProductDtoWithReviewsAndUsers =
        (await getOneProductByProductId(
          selectedId,
          1
        )) as OneProductDtoWithReviewsAndUsers;

      dispatch(setSelectedProductFct(oneProduct));
      setSpinDelete(false);
      return;
    } else {
      toast.error("Something went wrong");
      setSpinDelete(false);
      return;
    }
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

  const [editReview, setEditReview] = useState<boolean>(false);

  const onClickEditReview = async () => {
    setSpinEdit(true);
    const response = await editingReview(reviewToAdd);
    if (response.status === 200) {
      toast.success("the review is successfully updated");
      const responseFetchReviewByProductId: ReviewWithUsers[] =
        await getAllReviewsByProductId(item.review.reviewProductId as number);

      dispatch(
        setSelectedProductReviewWithUsersListFct(
          responseFetchReviewByProductId as ReviewWithUsers[]
        )
      );
      setReviewToAdd({
        reviewUserId: 0,
        reviewProductId: 0,
        reviewTitle: "",
        reviewDescription: "",
        reviewRating: 0,
        reviewVerifiedPurchase: false,
        reviewCreationDate: new Date(),
      });
      setSpinEdit(false);
      setEditReview(false);
      return;
    } else {
      toast.error("there is an error in updating");
      setSpinEdit(false);
      return;
    }
  };

  const [spinEdit, setSpinEdit] = useState<boolean>(false);
  const [spinDelete, setSpinDelete] = useState<boolean>(false);

  return !editReview ? (
    <div className="p-2 rounded-md text-white border border-white shadow-black shadow-md bg-[rgba(0,0,0,0.4)]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="w-14 h-14" />
          <div>
            <p className="text-sm font-semibold">
              {item.userEntity.preferredUsername}
            </p>
            <Rating
              name="read-only"
              value={item.review.reviewRating}
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "white",
                },
              }}
              className="text-xl"
            />

            <p className="text-xs">
              {" "}
              {formatDateString(String(item.review.reviewCreationDate))}
            </p>
          </div>
        </div>
        {item?.userEntity?.familyName === userEntity?.familyName &&
          item?.userEntity?.givenName === userEntity?.givenName &&
          item?.userEntity?.userEmail === userEntity?.userEmail &&
          item?.userEntity?.preferredUsername ===
            userEntity?.preferredUsername && (
            <div className="flex flex-row gap-3">
              <div
                onClick={() => {
                  setEditReview(true);
                  setReviewToAdd(item.review as Review);
                }}
                className="flex flex-row gap-1 bg-green-600 p-1 rounded-md text-sm items-center shadow-sm shadow-black cursor-pointer"
              >
                <FiEdit size={18} />
                <p>Edit</p>
              </div>
              <div
                onClick={onClickDeleteReview}
                className="flex flex-row gap-1 bg-red-600 p-1 rounded-md text-sm items-center shadow-sm shadow-black cursor-pointer"
              >
                {spinDelete ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <RiDeleteBin5Line size={20} />
                )}
                <p>Delete</p>
              </div>
            </div>
          )}
      </div>
      <br />
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-semibold text-md">
          Title: {item.review.reviewTitle}
        </h1>
        <p className="text-sm text-[rgba(255,255,255,0.8)]">
          {item.review.reviewDescription}
        </p>
        <div className="w-full flex flex-row justify-end items-center gap-1 text-xs">
          <p>25</p>
          <BiLike size={22} className="cursor-pointer" />
          <BiDislike size={22} className="cursor-pointer" />
          <p>45</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-2 rounded-md text-white border border-white flex flex-col gap-2 bg-[rgba(0,0,0,0.4)]">
      <div className="w-full flex flex-row justify-between">
        <p className="text-2xl font-bold">Editing review</p>
        <button
          onClick={() => {
            setEditReview(false);
            setReviewToAdd({
              reviewUserId: 0,
              reviewProductId: 0,
              reviewTitle: "",
              reviewDescription: "",
              reviewRating: 0,
              reviewVerifiedPurchase: false,
              reviewCreationDate: new Date(),
            });
          }}
          className="p-1 bg-red-600 rounded-md text-sm flex flex-row items-center"
        >
          <IoMdClose className="text-xl" />
          <p>Cancel</p>
        </button>
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
          onClick={onClickEditReview}
          className="p-1 bg-blue-600 rounded-md text-sm flex flex-row items-center gap-1"
        >
          {spinEdit ? (
            <ImSpinner9 className="animate-spin" />
          ) : (
            <FiSave className="text-lg" />
          )}
          <p>Save</p>
        </button>
      </div>
    </div>
  );
}

export default ReviewAboutProduct;
