import React from 'react';
import './Product.component.scss';
import { ProductModelType } from "../../types";

type ProductPropsType = {
  product: ProductModelType,
}

export const Product = ({product}: ProductPropsType) => {
  return (
    <div className="Product">
      <div className="Product-content">
        <h4 className="Product-content-title">{product.name}</h4>
        <p className="Product-content-description">{product.description}</p>
      </div>
      <div className="Product-pricing">
        <span>$ {product.price}</span>
      </div>
    </div>
  );
};
