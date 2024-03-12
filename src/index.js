import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import TokenContextProvider from "./Context/Token";

import ApiLinksProvider from "./Context/AllApiLinks/AllApiLinks";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "../node_modules/react-query/es/devtools/devtools";

import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext/WishListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
let query = new QueryClient();
root.render(
  <WishListContextProvider>
    <CartContextProvider>
      <ApiLinksProvider>
        <QueryClientProvider client={query}>
          <React.StrictMode>
            <TokenContextProvider>
              <App />
            </TokenContextProvider>
          </React.StrictMode>
          {/* <ReactQueryDevtools></ReactQueryDevtools> */}
        </QueryClientProvider>
      </ApiLinksProvider>
    </CartContextProvider>
  </WishListContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
