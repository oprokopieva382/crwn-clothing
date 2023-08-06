import { createContext, useState, useEffect} from "react";
import SHOP_LIST from "../shop-data.json";


export const ProductsContext = createContext({
  products: [],
  setCurrentProduct: null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_LIST);
  const value = { products, setProducts };

   return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
