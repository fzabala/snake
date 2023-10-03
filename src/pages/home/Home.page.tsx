import React, { useEffect } from "react";
import "./Home.page.scss";
import { Header, Product, ProductGrid } from "../../components";
import { fetchProducts, useAppDispatch, useAppSelector } from "../../store";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const { products, loading, fetchError } = useAppSelector(
    (store) => store.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderContent = () => {
    if (fetchError) {
      return <div className="ErrorWrapper">
        <p>Error {fetchError.message}</p>
          {fetchError.errors && <>
          <p>Fields with errors</p>
          <ul>
            {fetchError.errors.map(e => <li key={`error-field-${e.field}`}>{e.field}: {e.message}</li>)}
          </ul>
          </>}
        </div>;
    }

    if (loading) {
      return <p>Loading</p>;
    }

    return <ProductGrid products={products} />;
  };

  return (
    <div className="HomePage">
      <main>
        <Header />
        {renderContent()}
      </main>
    </div>
  );
};