import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { useState } from "react";
import { useEffect } from "react";
import './category.styles.scss';
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const Category = () => {
  const {category} = useParams();
  const categories = useSelector(selectCategories);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);
  
  return (
    <>
      <h2>{ category.toUpperCase() }</h2>
      <div className='category-container'>
        {
          products && 
            products.map(product => 
              <ProductCard key={product.id} product={product} />
            )
        }
      </div>
    </>
  )
}

export default Category;