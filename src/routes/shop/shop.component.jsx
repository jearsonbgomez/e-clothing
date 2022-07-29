import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category.component";
import './shop.styles.scss';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {

    const getCategoriesMap = async () => {

      const categories = await getCategoriesAndDocuments();

      dispatch(setCategories(categories));
    }

    getCategoriesMap();

  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />}/>
    </Routes>
  );
}

export default Shop;