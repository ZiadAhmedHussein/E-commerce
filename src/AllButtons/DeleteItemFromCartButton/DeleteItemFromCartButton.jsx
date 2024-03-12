import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
// import style from "./DeleteItemFromCartButton.module.css";

const DeleteItemFromCartButton = (props) => {
  let { deleteItemFromCart } = useContext(CartContext);

  async function deletItemFromUserCart(id) {
    let res = await deleteItemFromCart(id);
    if (res?.data?.status == "success") {
      toast.success("Item Dleted Successfully");
      props.onUpdatedData(res);
    } else {
      toast.error("Fail To Delete Item");
    }
  }

  return (
    <>
      <button
        onClick={() => deletItemFromUserCart(props.itemId)}
        className="btn btn-outline-danger fs-6 border-0"
      >
        <i className="fa-solid fa-trash-can me-2 "></i>
        Remove
      </button>
    </>
  );
};

export default DeleteItemFromCartButton;
