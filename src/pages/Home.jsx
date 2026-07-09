import { useContext } from "react";
import Layout from "../shared/Layout";

import ProductItems from "../shared/ProductItems";
import { ProductContext } from "../Context/ProductProvider";



const Home = () => {
  const { Product } = useContext(ProductContext);

  // useEffect(() => {
  //   console.log("product:", Product);
  // }, [Product]);

  return (
    <Layout>
      <div className="bg-gray-300 min-h-screen pt-20 px-8">
        <ProductItems Product={Product} />
      </div>
    </Layout> 
  );
};

export default Home;