import { Routes, Route } from "react-router-dom";
import { CategoriesPreview } from "../categories-preview/CategoriesPreview.component";
import { Category } from "../category/Category";
import { useEffect } from "react";
import { setCategories } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const Shop = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesMap = async () => {
      const category = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(category));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path="/:category" element={<Category />} />
    </Routes>
  );
};
