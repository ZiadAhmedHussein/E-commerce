import React, { useContext } from "react";
import style from "./DecreaseItemCountInCartButton.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const DecreaseItemCountInCartButton = (props) => {
  const { changeItemCountCart, deleteItemFromCart } = useContext(CartContext);

  async function decreaseItemCount(id, countt) {
    if (countt === 0) {
      let res = await deleteItemFromCart(id);
      if (res?.data?.status == "success") {
        toast.success("Item Dleted Successfully");
        props.onUpdatedData(res);
      } else {
        toast.error("Fail To Delete Item");
      }
    } else {
      let res = await changeItemCountCart(id, countt);
      if (res?.data?.status === "success") {
        props.onUpdatedData(res);
      }
    }
  }

  return (
    <>
      <button
        onClick={() =>
          decreaseItemCount(props.itemId, Number(props.oldCount) - 1).toString()
        }
        className={`${style.button} btn btn-outline-danger fs-4 d-flex align-items-center justify-content-center `}
      >
        -
      </button>
    </>
  );
};

export default DecreaseItemCountInCartButton;
