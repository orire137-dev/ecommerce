import { useContext, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { ProductContext } from "../Context/ProductProvider";
import ProductItems from "../shared/ProductItems";

const Women = () => {
  const { Product } = useContext(ProductContext);
  const [women, setWomen] = useState([]);

  useEffect(() => {
    const filtered = Product.filter((item) => item?.category === "women");

    if (filtered) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWomen(filtered);
    }
  }, [Product]);
  return (
    <Layout>
      <div className="bg-gray-300 min-h-screen pt-20 px-8">
        <ProductItems Product={women} />
      </div>
    </Layout>
  );
};

export default Women;