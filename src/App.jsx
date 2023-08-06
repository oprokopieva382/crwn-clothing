import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/home/Home.component";
import { Navigation } from "./routes/navigation/Navigation.component";
import { Authentication } from "./routes/sign-in/Authentication.component";
import { Shop } from "./routes/shop/Shop";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
