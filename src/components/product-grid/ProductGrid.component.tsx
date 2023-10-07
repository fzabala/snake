import React from 'react';
import './ProductGrid.component.scss';
import { ProductModelType } from "../../types";
import { Product } from '../product';

type ProductGridPropsType = {
  products: ProductModelType[],
}

export const ProductGrid = ({products}: ProductGridPropsType) => {
  return (
    <div className="ProductGrid">
      {products.map((product) => <Product key={`product-${product.id}`} product={product} />)}
    </div>
  );
};
