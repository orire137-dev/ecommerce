import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import ProductProvider from "./Context/ProductProvider.jsx";
import SingleProducts from "./pages/SingleProducts.jsx";
import Cart from "./pages/Checkout.jsx";
import Checkout from "./pages/Checkout.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <About />,
        path: "about",
      },
      {
        element: <Contact />,
        path: "contact",
      },
      {
        element: <Men />,
        path: "men",
      },
      {
        element: <Women />,
        path: "women",
      },
      {
        element: <Kids />,
        path: "kids",
      },
      {
        element: <SingleProducts />,
        path: "singleproduct/:id",
      },
      {
  element: <Checkout />,
  path: "checkout",
},

    ],
  },
]);




createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <StrictMode>
      <RouterProvider router={router} />
      <App />
    </StrictMode>
  </ProductProvider>,
);