import { createContext } from "react";

export let ApiLinks = createContext();

export default function ApiLinksProvider(props) {
  let baseURLLink = "https://ecommerce.routemisr.com";
  let allCatigories = `${baseURLLink}/api/v1/categories`;
  let allProducts = `${baseURLLink}/api/v1/products`;
  let specificProductLink = `${baseURLLink}/api/v1/products/`;
  let allBrands = `${baseURLLink}/api/v1/brands`;
  let registerLink = `${baseURLLink}/api/v1/auth/signup`;
  let signinLink = `${baseURLLink}/api/v1/auth/signin`;

  let mainCart = `${baseURLLink}/api/v1/cart`;
  return (
    <>
      <ApiLinks.Provider
        value={{
          baseURLLink,
          allCatigories,
          allProducts,
          specificProductLink,
          allBrands,
          registerLink,
          signinLink,
          mainCart,
        }}
      >
        {props.children}
      </ApiLinks.Provider>
    </>
  );
}
