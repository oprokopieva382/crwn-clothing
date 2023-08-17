import { Directory } from "../../components/directory/Directory.component";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};
