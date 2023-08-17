import { FC } from "react";
import {
  BackgroundImage,
  Body,
  DirectoryItemComponent,
} from "./directory-item.styles";
import {useNavigate} from "react-router-dom"
import { DirectoryCategory } from "../directory/Directory.component";

type DirectoryItemProps = {
  category: DirectoryCategory;
};

export const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl, route } = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemComponent onClick={onNavigateHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemComponent>
  );
};

