import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';

import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="categories-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <ProductCard key={title} title={title} products={products} />;
      })}
    </div>
  );
};

export default Shop;
