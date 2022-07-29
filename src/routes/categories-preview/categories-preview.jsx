import CategoryPreview from "../../components/category-preview/category-preview.component";
import '../../components/categories/categories.styles.scss';
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const categories = useSelector(selectCategories);
  
  return (
    categories && <div className="categories-container">
      {
        Object.keys(categories).map(title => {
          const products = categories[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </div>
  )
}

export default CategoriesPreview;