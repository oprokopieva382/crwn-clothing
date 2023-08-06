import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { ProductCard } from "../../components/product-card/ProductCard.component";
import "./shop.style.scss"

export const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
