import React from "react";
import "./App.scss";
import { HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const routes = [
    {
      path: "/",
      component: <HomePage />,
      title: "Homepage",
      exact: true,
    },
  ];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {routes.map((route, index) => (
              <Route
                {...route}
                key={index}
                element={<Layout title={route.title}>{route.component}</Layout>}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
