"use client";

import { addListOfCategoriesFct } from "@ext/lib/reduxToolkit/features/listOfCatgories/listOfCategories";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import { getCategories } from "@ext/lib/usefulFunctions/usefulFunctions";
import {
  Category,
  Product,
  ProductDtoWithoutCategory,
  Property,
} from "@ext/typings";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { RiSave3Line } from "react-icons/ri";
import { toast } from "react-toastify";

import { storage } from "@ext/lib/firebase/firebase";
import { setListOfPropertiesPerProductFct } from "@ext/lib/reduxToolkit/features/listOfPropertiesPerProduct/listOfPropertiesPerProduct";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { addOneProduct } from "@ext/lib/usefulFunctions/usefulFunctions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { TiPlus } from "react-icons/ti";
import imageProduct from "./../../../public/products/samsung-galaxy-s24-smartphone-128-go-noir.webp";
import PropertiesOfProduct from "./PropertiesOfProduct";

function AddNewProductPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImage, setProductImage] = useState("");
  const [showSpin, setShowSpin] = useState<boolean>();
  const [product, setProduct] = useState<Product>({
    productCategoryId: 0,
    productTitle: "",
    productDescription: "",
    productImage: `${imageProduct.src}` as string,
    productPrice: 0,
    productRemainingQuantity: 0,
    productRating: 0,
  });

  const [oneProperty, setOneProperty] = useState<Property>({
    propertyProductId: 0,
    propertyName: "",
    propertyValue: "",
  });
  const propertyList: Property[] = useAppSelector(
    (state) => state.listOfPropertiesPerProduct.value
  );

  const { data: session, status } = useSession();

  const listOfCategories: Category[] = useAppSelector(
    (state) => state.listOfCategories.value
  );

  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    const categories: Category[] = await getCategories();
    dispatch(addListOfCategoriesFct(categories));
  };

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchCategories();
    }
  }, [(session as any)?.accessToken]);
  let [priceEmpty, setPriceEmpty] = useState<number | string>(0);
  let [productRemainingQuantityReda, setProductRemainingQuantityReda] =
    useState<number | string>(0);

  const onChangeProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevValue) => {
      let value = {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
      if (e.target.name === "productPrice") {
        console.log(Number(e.target.value));
        setPriceEmpty(Number(e.target.value));
        value = {
          ...prevValue,
          [e.target.name]: Number(e.target.value),
        };
      } else if (e.target.name === "productRemainingQuantity") {
        setProductRemainingQuantityReda(Number(e.target.value));
        value = {
          ...prevValue,
          [e.target.name]: Number(e.target.value),
        };
      }
      return value;
    });
  };

  const onChangeProductTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProduct((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeProductSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProduct((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: Number(e.target.value),
      };
    });
  };

  const onChangeProperty = (e: ChangeEvent<HTMLInputElement>) => {
    setOneProperty((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onClickAddProperty = (e: MouseEvent) => {
    e.preventDefault();

    if (oneProperty.propertyName === "" || oneProperty.propertyValue === "") {
      toast.error("The name of the property and its value must not be empty");
      return;
    }

    dispatch(setListOfPropertiesPerProductFct([...propertyList, oneProperty]));

    setOneProperty({
      propertyProductId: 0,
      propertyName: "",
      propertyValue: "",
    });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpin(true);
    if (product.productTitle === "") {
      toast.error("Please add the title of the product");
      setShowSpin(false);
      return;
    }

    if (product.productDescription === "") {
      toast.error("Please add the description of the product");
      setShowSpin(false);
      return;
    }

    if (product.productPrice === 0) {
      toast.error("Please add the price of the product");
      setShowSpin(false);
      return;
    }

    if (product.productCategoryId === 0) {
      toast.error("Please select the category of the product");
      setShowSpin(false);
      return;
    }

    if (!imageFile) {
      toast.error("Please add the image of the product");
      setShowSpin(false);
      return;
    }

    let downloadURL = "";
    let nameFile = "";
    const dateOfAddingProduct = new Date();
    if (imageFile) {
      nameFile =
        product.productTitle +
        "-" +
        product.productCategoryId +
        "-" +
        dateOfAddingProduct +
        "-" +
        imageFile?.name;

      const storageRef = ref(storage, nameFile);

      await uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          console.log("File uploaded successfully:", snapshot);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
    } else {
      console.error("No image file selected.");
    }

    const productDtoWithoutCategory: ProductDtoWithoutCategory = {
      product: { ...product, productImage: downloadURL as string },
      properties: propertyList,
    };
    const data = await addOneProduct(productDtoWithoutCategory);
    if (data === true) {
      toast.success("The product is added successfully");
    } else {
      toast.error("Error in adding product");
      setShowSpin(false);
      setPriceEmpty(0);
      return;
    }
    setShowSpin(false);
    setProduct({
      productCategoryId: 0,
      productTitle: "",
      productDescription: "",
      productImage: "",
      productPrice: 0,
      productRemainingQuantity: 0,
      productRating: 0,
    });
    setImageFile(null);
    setProductImage("");
    dispatch(setListOfPropertiesPerProductFct([]));
    setPriceEmpty("");
    setProductRemainingQuantityReda("");

    setOneProperty({
      propertyProductId: 0,
      propertyName: "",
      propertyValue: "",
    });
    return;
  };

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setProductImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <form action="" className="w-full" onSubmit={onSubmitForm}>
        <div className="flex flex-col p-4 gap-4 bg-[rgba(0,0,0,0.3)] rounded-lg">
          <div className="flex flex-row items-center gap-2 justify-between">
            <p className="text-white text-xl sm:text-2xl font-bold">
              Add New Product
            </p>
            <button
              type="submit"
              className="bg-blue-500 text-white w-fit shadow-black shadow-sm p-1.5 rounded-md flex flex-row items-center gap-1"
              disabled={showSpin ? true : false}
            >
              {showSpin ? (
                <ImSpinner9 className="text-xl animate-spin" />
              ) : (
                <RiSave3Line fontSize={20} />
              )}

              <span>Create</span>
            </button>
          </div>
          <hr className="border-[rgba(255,255,255,0.4)]" />
          <div className="grid grid-cols-1 lg:grid-cols-2  text-white gap-3">
            <div className="p-2 rounded-lg text-[rgba(255,255,255,0.7)] flex flex-col gap-4">
              <div className="w-full flex flex-col gap-1">
                <p className="text-sm text-white">Product Title: *</p>
                <input
                  onChange={onChangeProductInput}
                  name="productTitle"
                  value={product.productTitle}
                  type="text"
                  placeholder="Title of product"
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none w-full border border-[rgba(255,255,255,0.5)]"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="text-xs flex flex-row justify-between items-center">
                  <p className="text-sm text-white">Description: *</p>
                  <p className="text-xs">
                    {product.productDescription.length} / 1000 characters
                  </p>
                </div>

                <textarea
                  onChange={onChangeProductTextArea}
                  name="productDescription"
                  value={product.productDescription}
                  rows={10}
                  className="w-full bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none border border-[rgba(255,255,255,0.5)] resize-none"
                  placeholder="Description of product"
                  maxLength={1000}
                />
              </div>
              <div className="w-full flex flex-col gap-1 text-white">
                <p className="text-sm ">Quantity in Inventory: *</p>
                <input
                  onChange={onChangeProductInput}
                  name="productRemainingQuantity"
                  type="number"
                  step={1}
                  // defaultValue={0}
                  value={String(productRemainingQuantityReda)}
                  placeholder="Price of product ..."
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none w-full border border-[rgba(255,255,255,0.5)]"
                />
              </div>
            </div>
            <div className="p-2 rounded-lg text-white flex flex-col gap-4">
              <div className="w-full flex flex-col gap-1">
                <p className="text-sm">Price: *</p>
                <input
                  onChange={onChangeProductInput}
                  name="productPrice"
                  type="number"
                  value={String(priceEmpty)}
                  placeholder="Price of product ..."
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none w-full border border-[rgba(255,255,255,0.5)]"
                />
              </div>

              <div className="text-white w-full flex flex-col gap-1">
                <p className="text-sm">Category: *</p>
                <select
                  name="productCategoryId"
                  onChange={onChangeProductSelect}
                  className="bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none w-full border border-[rgba(255,255,255,0.5)]"
                  value={product.productCategoryId}
                >
                  <option value={0} className="text-black bg-white">
                    -- Select Category --
                  </option>
                  {listOfCategories.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.categoryId}
                        className="text-black bg-white"
                      >
                        {item.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-white w-full flex flex-col gap-1">
                <p className="text-sm">Product Image: *</p>
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  className="text-sm"
                  accept="image/*"
                  onChange={handleOnChangeImage}
                  value={productImage ? undefined : ""}
                />
              </div>
              {imageFile && productImage && (
                <div>
                  <Image
                    src={productImage}
                    alt="image of the product"
                    className="w-36"
                    width={100}
                    height={100}
                  />
                  {/* <div className="w-36 h-32 border"></div> */}
                </div>
              )}
            </div>
          </div>
          <div className="border border-white rounded-lg overflow-hidden">
            <table className="w-full   text-white text-xs sm:text-sm ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-[rgba(0,0,0,0.7)] text-left">
                    Property
                  </th>
                  <th className="py-2 px-4 border-b bg-[rgba(0,0,0,0.7)] text-left">
                    Value
                  </th>

                  <th className="py-2 px-4 border-b bg-[rgba(0,0,0,0.7)] text-left w-fit"></th>
                </tr>
              </thead>
              <tbody className="bg-[rgba(255,255,255,0.1)]">
                <tr>
                  <td className="py-2 px-1 sm:px-4 border-b">
                    <input
                      onChange={onChangeProperty}
                      name="propertyName"
                      type="text"
                      className="outline-none rounded-md p-1 w-full placeholder:text-[rgba(255,255,255,0.6)] border border-white  text-xs sm:text-sm bg-transparent text-white"
                      placeholder="add property ..."
                      value={oneProperty.propertyName}
                    />
                  </td>
                  <td className="py-2 px-1 sm:px-4 border-b">
                    <input
                      onChange={onChangeProperty}
                      name="propertyValue"
                      type="text"
                      className="outline-none rounded-md p-1 w-full placeholder:text-[rgba(255,255,255,0.6)] border border-white  text-xs sm:text-sm bg-transparent text-white"
                      placeholder="add value ..."
                      value={oneProperty.propertyValue}
                    />
                  </td>
                  <td className="py-2 px-1 sm:px-4 border-b w-fit ">
                    <button
                      onClick={onClickAddProperty}
                      className="bg-[rgb(33,146,71)] text-white px-2 py-1 rounded-md text-sm shadow-sm shadow-black font-bold flex flex-row gap-1 items-center"
                    >
                      <TiPlus />
                      <p>Add</p>
                    </button>
                  </td>
                </tr>

                {propertyList.map((property, index) => {
                  return (
                    <PropertiesOfProduct
                      key={index}
                      property={property}
                      index={index}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewProductPage;
