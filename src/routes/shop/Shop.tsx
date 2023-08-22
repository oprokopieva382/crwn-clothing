import { Routes, Route } from "react-router-dom";
import { CategoriesPreview } from "../categories-preview/CategoriesPreview.component";
import { Category } from "../category/Category";
import { useEffect } from "react";
import { fetchCategoryStart } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;