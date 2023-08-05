import "./directory.styles.scss";
import { CategoryItem } from "../category-item/Category-item.component";

export const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
