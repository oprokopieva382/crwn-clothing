import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { checkUserSession } from "./store/userReducer/user.action";
import { Spinner } from "./components/spinner/Spinner.component";
import { GlobalStyle } from "./global.styles";

const Navigation = lazy(() =>
  import('./routes/navigation/Navigation.component')
);
const Home = lazy(() => import('./routes/home/Home.component'));
const Authentication = lazy(() =>
  import('./routes/sign-in/Authentication.component')
);
const Shop = lazy(() => import('./routes/shop/Shop'));
const CheckOutCart = lazy(() => import('./routes/checkout/CheckOutCart'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
    <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckOutCart />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
