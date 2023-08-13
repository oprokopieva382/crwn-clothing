import { Home } from "./routes/home/Home.component";
import { Navigation } from "./routes/navigation/Navigation.component";
import { Authentication } from "./routes/sign-in/Authentication.component";
import { Shop } from "./routes/shop/Shop";
import { CheckOutCart } from "./routes/checkout/CheckOutCart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { checkUserSession } from "./store/userReducer/user.action";
import { getCurrentUser } from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // getCurrentUser().then((user)=> console.log(user))
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOutCart />} />
      </Route>
    </Routes>
  );
};

export default App;
