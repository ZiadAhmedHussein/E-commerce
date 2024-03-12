import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishProducts, setWishProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let headers = { token: localStorage.getItem("userToken") };

  function getUserWishList() {
    setIsLoading(true);
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((res) => {
        setIsLoading(false);

        setWishProducts(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function ProductToWishList(id) {
    setIsLoading(true);

    if (!localStorage.getItem("wishList")?.split(",").includes(id)) {
      return axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            productId: id,
          },
          {
            headers,
          }
        )
        .then((res) => {
          localStorage.setItem("wishList", res?.data?.data);
          toast.success("Product added to Wish list Successfully");

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      RemoveItemFromWish(id);
    }
  }

  function RemoveItemFromWish(id) {
    setIsLoading(true);
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => {
        localStorage.setItem("wishList", res.data.data);
        toast.success("Product deleted to Wish list Successfully");
        setIsLoading(false);
        getUserWishList();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  return (
    <WishListContext.Provider
      value={{
        isLoading,
        wishProducts,
        getUserWishList,
        RemoveItemFromWish,
        ProductToWishList,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
