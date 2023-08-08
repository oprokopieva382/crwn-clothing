import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "./../../context/CategoriesContext";
import { ProductCard } from "../../components/product-card/ProductCard.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";

export const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};
