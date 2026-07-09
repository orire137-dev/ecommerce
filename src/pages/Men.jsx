import { useContext, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { ProductContext } from "../Context/ProductProvider";
import ProductItems from "../shared/ProductItems";

const Men = () => {
  const { Product } = useContext(ProductContext);

  const [men, setMen] = useState([]);

  useEffect(() => {
    const filtered = Product.filter((item) => item?.category === "men");

    if (filtered) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMen(filtered);
    }
  }, [Product]);

  return (
    <Layout>
      <div className="bg-pink-500 h-screen">
        <ProductItems Product={men} />
      </div>
    </Layout>
  );
};

export default Men;