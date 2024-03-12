import React, { useContext } from "react";
import style from "./IncreaseItemCountInCartButton.module.css";
import { CartContext } from "../../Context/CartContext";

const IncreaseItemCountInCartButton = (props) => {
  const { changeItemCountCart } = useContext(CartContext);

  async function increaseItemCount(id, countt) {
    let res = await changeItemCountCart(id, countt);

    if (res?.data?.status === "success") {
      props.onUpdatedData(res);
    }
  }

  return (
    <>
      <button
        onClick={() =>
          increaseItemCount(props.itemId, Number(props.oldCount) + 1).toString()
        }
        className={`${style.button} btn btn-outline-success fs-4 d-flex align-items-center justify-content-center `}
      >
        +
      </button>
    </>
  );
};

export default IncreaseItemCountInCartButton;
