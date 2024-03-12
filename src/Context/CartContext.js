// export let AddProductToCartContext = createContext();

import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let baseApiLink = "https://ecommerce.routemisr.com/api/v1/cart";
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [numbersOfCartItems, setNumbersOfCartItems] = useState("");
  let headers = { token: localStorage.getItem("userToken") };

  function addToCart(id) {
    setIsLoadingCart(true);
    return axios
      .post(baseApiLink, { productId: id }, { headers })
      .then((res) => {
        toast.success("Product Added Successfully");
        setNumbersOfCartItems(res?.data?.numOfCartItems);
        localStorage.setItem("numberCartItems", res?.data?.numOfCartItems);

        setIsLoadingCart(false);
        return res;
      })
      .catch((err) => {
        setIsLoadingCart(false);
        toast.error("Fail To Add Product");
        console.log(err);
      });
  }

  function getUserCart() {
    return axios
      .get(baseApiLink, { headers })
      .then((res) => {
        if (res?.data?.numOfCartItems) {
          setNumbersOfCartItems(res?.data?.numOfCartItems);
          localStorage.setItem("numberCartItems", res?.data?.numOfCartItems);
        } else {
          setNumbersOfCartItems("0");
          localStorage.setItem("numberCartItems", "0");
        }
        return res;
      })
      .catch((err) => {
        // setIsLoading(false);
        return err;
      });
  }

  function deleteItemFromCart(id) {
    setIsLoadingCart(true);
    return axios
      .delete(`${baseApiLink}/${id}`, { headers })
      .then((res) => {
        setIsLoadingCart(false);
        if (res?.data?.numOfCartItems) {
          setNumbersOfCartItems(res?.data?.numOfCartItems);
          localStorage.setItem("numberCartItems", res?.data?.numOfCartItems);
        } else {
          setNumbersOfCartItems("0");
          localStorage.setItem("numberCartItems", "0");
        }
        return res;
      })
      .catch((err) => {
        setIsLoadingCart(false);
        return err;
      });
  }

  function clearCart() {
    return axios
      .delete(baseApiLink, { headers })
      .then((res) => {
        if (res?.data?.numOfCartItems) {
          setNumbersOfCartItems(res?.data?.numOfCartItems);
          localStorage.setItem("numberCartItems", res?.data?.numOfCartItems);
        } else {
          setNumbersOfCartItems("0");
          localStorage.setItem("numberCartItems", "0");
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeItemCountCart(id, itemCount) {
    setIsLoadingCart(true);
    return axios
      .put(`${baseApiLink}/${id}`, { count: itemCount }, { headers })
      .then((res) => {
        setIsLoadingCart(false);
        if (res?.data?.numOfCartItems) {
          setNumbersOfCartItems(res?.data?.numOfCartItems);
          localStorage.setItem("numberCartItems", res?.data?.numOfCartItems);
        } else {
          setNumbersOfCartItems("0");
          localStorage.setItem("numberCartItems", "0");
        }
        return res;
      })
      .catch((err) => {
        setIsLoadingCart(false);
        return err;
      });
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        deleteItemFromCart,
        clearCart,
        changeItemCountCart,
        numbersOfCartItems,

        headers,
        isLoadingCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
