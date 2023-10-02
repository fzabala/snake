import React, { useEffect, useRef } from 'react';
import './Home.page.scss';
import { Header, Product } from "../../components";
import {
  productIndexAction,
  useAppDispatch,
  useAppSelector
} from "../../store";

export const HomePage = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  
  const {products, isIndexFetching} = useAppSelector(store => store.product)

  useEffect(() => {
    dispatch(productIndexAction());
  }, [dispatch]);

  return (
    <div className="HomePage">
      <main ref={ref}>
        <Header/>
        {isIndexFetching && <p>Loading</p>}
        {!isIndexFetching && products.map((product) => <Product product={product} />)}
      </main>
    </div>
  );
};
