import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [Product, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isUser, setIsUser] = useState(false);
  const [CartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );
  const [cartCount, setCartCount] = useState(0);

  const HandleGetProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "GET",
      });

      const data = await res.json();

      if (data) {
        setProducts(data);
        toast.success("Products Retrived successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    HandleGetProducts();
  }, []);
  useEffect(() => {
    console.log("cart:", CartItems);
  }, [CartItems]);

  // CartCount calculation
  useEffect(() => {
    const totalCartItems = CartItems.reduce(
      (acc, cur) => acc + cur?.quantity,
      0,
    );

    if (totalCartItems) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartCount(totalCartItems);
    }
  }, [CartItems]);

  const AddToCart = async (prod, size, quantity) => {
    try {
      if (!isUser) {
        let updatedCartItems;
        //get users cart
        let storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

        //check for existing item

        const existingItem = storedCart.find(
          (item) => parseInt(item?.id) === parseInt(prod?.id),
        );

        if (existingItem) {
          updatedCartItems = storedCart.map((item) =>
            parseInt(item?.id) === parseInt(existingItem?.id)
              ? {
                  ...item,
                  quantity: item?.quantity + (parseInt(quantity) || 1),
                  size: size || item?.defaultSize,
                }
              : item,
          );

          toast.info("Existing item added susseffully");
        } else {
          updatedCartItems = [
            ...storedCart,
            {
              ...prod,
              quantity: quantity || 1,
              size: size || prod?.defaultSize,
            },
          ];
          toast.success(" item added susseffully");
        }

        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        console.log("User is authentif");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const UpdateCart = async (prod, quantity) => {
    try {
      if (!isUser) {
        let updatedCartItems;
        //get users cart
        let storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingItem = storedCart.find(
          (item) => parseInt(item?.id) === parseInt(prod?.id),
        );

        if (existingItem) {
          updatedCartItems = storedCart.map((item) =>
            parseInt(item?.id) === parseInt(existingItem?.id)
              ? { ...item, quantity: quantity }
              : item,
          );
          toast.success("Item updated successfully");
        } else {
          toast.error("Item not found!");
        }

        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        console.log("user!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const DeleteCart = async (id) => {
    try {
      if (!isUser) {
        let updatedCartItems;
        //get users cart
        let storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItem = storedCart.find(
          (item) => parseInt(item?.id) === parseInt(id),
        );

        if (existingItem) {
          updatedCartItems = storedCart.filter(
            (item) => parseInt(item?.id) !== parseInt(id),
          );
        }
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        console.log("user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        Product,
        HandleGetProducts,
        AddToCart,
        CartItems,
        cartCount,
        DeleteCart,
        UpdateCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export { ProductContext };