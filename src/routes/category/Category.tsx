import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/product-card/ProductCard.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { Spinner } from "../../components/spinner/Spinner.component";

type CategoryRouteParamas = {
  category: string;
};

export const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParamas
  >() as CategoryRouteParamas;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};
