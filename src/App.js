import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getCategoriesAndDocuments, onAuthStateChangedListener, upsertUser } from "./utils/firebase/firebase.utils";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import { setUser } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribe = onAuthStateChangedListener((user) => {

      if(user) {
        upsertUser(user);
      }
      dispatch(setUser(user))
    });

    return unsubscribe;
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
