"use client";

import { GradientCircularProgress } from "@ext/components/loadingSpin/Spins";
import { storage } from "@ext/lib/firebase/firebase";
import { addListOfCategoriesFct } from "@ext/lib/reduxToolkit/features/listOfCatgories/listOfCategories";
import { setListOfPropertiesPerProductFct } from "@ext/lib/reduxToolkit/features/listOfPropertiesPerProduct/listOfPropertiesPerProduct";
import { showLeftMenuFct } from "@ext/lib/reduxToolkit/features/showLeftMenu/showLeftMenu";
import { useAppDispatch, useAppSelector } from "@ext/lib/reduxToolkit/hooks";
import {
  editOneProduct,
  getCategories,
  getOneProductByProductId,
} from "@ext/lib/usefulFunctions/usefulFunctions";
import {
  Category,
  Product,
  ProductDto,
  ProductDtoWithoutCategory,
  Property,
} from "@ext/typings";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { RiSave3Line } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { toast } from "react-toastify";
import PropertiesOfProduct from "../addNewProduct/PropertiesOfProduct";
import imageProduct from "./../../../public/products/samsung-galaxy-s24-smartphone-128-go-noir.webp";

function EditProductAdmin() {
  const router = useRouter();
  const [showSpin, setShowSpin] = useState<boolean>();
  const pathName = usePathname().split("/");
  const selectedId: number = Number(pathName[4]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto>();
  const [visualizeEditProduct, setVisualizeEditProduct] =
    useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    productId: selectedId,
    productCategoryId: 0,
    productTitle: "",
    productDescription: "",
    productImage: "",
    productPrice: 0,
    productRemainingQuantity: 0,
    productRating: 0,
  });

  const [oneProperty, setOneProperty] = useState<Property>({
    propertyProductId: selectedId,
    propertyName: "",
    propertyValue: "",
  });
  const propertyList: Property[] = useAppSelector(
    (state) => state.listOfPropertiesPerProduct.value
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    setProductImage(product.productImage);
  }, [product]);

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setProductImage(URL.createObjectURL(file));
    }
  };

  const { data: session, status } = useSession();

  const listOfCategories: Category[] = useAppSelector(
    (state) => state.listOfCategories.value
  );

  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    const categories: Category[] = await getCategories();
    dispatch(addListOfCategoriesFct(categories));
  };

  const fetchOneProduct = async () => {
    setVisualizeEditProduct(false);
    setIsPending(true);
    const oneProduct: ProductDto = (await getOneProductByProductId(
      selectedId,
      0
    )) as ProductDto;

    if (!oneProduct) {
      setVisualizeEditProduct(false);
      setIsPending(false);
      return;
    }

    setProduct(oneProduct.product);
    dispatch(setListOfPropertiesPerProductFct(oneProduct.properties));
    setVisualizeEditProduct(true);
  };

  useEffect(() => {
    if ((session as any)?.accessToken) {
      dispatch(showLeftMenuFct(false));
      fetchCategories();
    }
  }, [(session as any)?.accessToken]);

  useEffect(() => {
    if ((session as any)?.accessToken) {
      fetchOneProduct();
    }
  }, [(session as any)?.accessToken]);

  const onChangeProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevValue) => {
      let value = {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
      if (
        e.target.name === "productPrice" ||
        e.target.name === "productRemainingQuantity"
      ) {
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

  const onClickAddProperty = (e: any) => {
    e.preventDefault();

    if (oneProperty.propertyName === "" || oneProperty.propertyValue === "") {
      toast.error("The name of the property and its value must not be empty");
      return;
    }

    dispatch(setListOfPropertiesPerProductFct([...propertyList, oneProperty]));

    setOneProperty({
      propertyProductId: selectedId,
      propertyName: "",
      propertyValue: "",
    });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpin(true);
    let downloadURL = product.productImage;
    if (productImage !== product.productImage) {
      const storageRef = ref(storage, product.productImage as string);
      await deleteObject(storageRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          toast.error("Error in deleting Image");
          return null;
        });

      downloadURL = "";
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
    }
    const productDtoWithoutCategory: ProductDtoWithoutCategory = {
      product: { ...product, productImage: downloadURL },
      properties: propertyList,
    } as ProductDtoWithoutCategory;
    await editOneProduct(productDtoWithoutCategory);
    setShowSpin(false);
    setProduct({
      productCategoryId: product.productCategoryId,
      productTitle: "",
      productDescription: "",
      productImage: `${imageProduct.src}` as string,
      productPrice: 0,
      productRemainingQuantity: 0,
      productRating: 0,
    });
    dispatch(setListOfPropertiesPerProductFct([]));
    router.push("/admin_space/products/oneProduct/" + selectedId);
    return;
  };

  return visualizeEditProduct ? (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="w-full flex flex-row justify-start">
        <p
          onClick={() => router.back()}
          className="text-white text-lg font-semibold flex flex-row items-center gap-2 hover:underline cursor-pointer w-fit"
        >
          <FaArrowLeft />
          <span>Go back</span>
        </p>
      </div>
      <form action="" className="w-full" onSubmit={onSubmitForm}>
        <div className="flex flex-col p-4 gap-4 bg-[rgba(0,0,0,0.3)] rounded-lg">
          <div className="flex flex-row items-center gap-2 justify-between">
            <p className="text-white text-xl sm:text-2xl font-bold">
              Edit Product
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

              <span>Save Changes</span>
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
                  defaultValue={product.productTitle}
                  type="text"
                  placeholder="Title of product"
                  className="bg-[rgba(0,0,0,0.4)] text-white text-sm rounded-md p-1.5 outline-none w-full border border-[rgba(255,255,255,0.5)]"
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
                  defaultValue={product.productDescription}
                  rows={10}
                  className="w-full text-white bg-[rgba(0,0,0,0.4)] text-sm rounded-md p-1.5 outline-none border border-[rgba(255,255,255,0.5)]"
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
                  value={String(product.productRemainingQuantity)}
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
                  step={1}
                  // defaultValue={product.productPrice as number}
                  value={String(product.productPrice)}
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
                        selected={
                          (item.categoryId as number) ===
                          (product.productCategoryId as number)
                        }
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
              <div>
                <Image
                  src={productImage}
                  alt="image of the product"
                  className="w-36"
                  width={100}
                  height={100}
                />
              </div>
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
                  <td className="py-2 px-4 border-b">
                    <input
                      onChange={onChangeProperty}
                      name="propertyName"
                      type="text"
                      className="outline-none rounded-md p-1 w-full placeholder:text-[rgba(255,255,255,0.8)] border border-white text-black text-sm"
                      placeholder="add property ..."
                      value={oneProperty.propertyName}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      onChange={onChangeProperty}
                      name="propertyValue"
                      type="text"
                      className="outline-none rounded-md p-1 w-full placeholder:text-[rgba(255,255,255,0.8)] border border-white text-black text-sm"
                      placeholder="add value ..."
                      value={oneProperty.propertyValue}
                    />
                  </td>
                  <td className="py-2 px-4 border-b w-fit ">
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
            router.push("/admin_space/products");
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

export default EditProductAdmin;
