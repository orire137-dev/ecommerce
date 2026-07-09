import { useContext, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { ProductContext } from "../Context/ProductProvider";
import ProductItems from "../shared/ProductItems";

const Kids = () => {
  const { Product } = useContext(ProductContext);
  const [kids, setKids] = useState([]);

  useEffect(() => {
    const filtered = Product.filter((item) => item?.category === "kids");

    if (filtered) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setKids(filtered);
    }
  }, [Product]);
  return (
    <Layout>
      <div className="bg-gray-300 min-h-screen pt-20 px-8">
        <ProductItems Product={kids} />
      </div>
    </Layout>
  );
};

export default Kids;