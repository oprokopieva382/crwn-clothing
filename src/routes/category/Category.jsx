import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/product-card/ProductCard.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

export const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
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
