import "./directory.styles.scss";
import {DirectoryItem} from "../directory-item/DirectoryItem.component"

export const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
