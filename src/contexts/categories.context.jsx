import { createContext, useEffect, useState } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
  
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const categoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    categoriesMap();
  }, []);

  const value = {categoriesMap, setCategoriesMap};

  return <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>;

} 