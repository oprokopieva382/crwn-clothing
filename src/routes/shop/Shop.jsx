import { useContext } from "react";
import { ProductCard } from "../../components/product-card/ProductCard.component";
import "./shop.style.scss";
import { CategoriesContext } from "../../context/CategoriesContext";

export const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log(categoriesMap);

  return (
    <div>
      {Object.keys(categoriesMap).map((title) => (
        <div key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {categoriesMap[title].map((category) => (
              <ProductCard key={category.id} product={category} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
