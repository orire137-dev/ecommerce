import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductProvider";
import Layout from "../shared/Layout";

const SingleProducts = () => {
  const [singleProduct, setSingleProduct] = useState({});


  const { Product, AddToCart } = useContext(ProductContext);
//   const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (singleProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSize(singleProduct?.defaultSize);
    }
  }, [singleProduct]);
  useEffect(() => {
    console.log("selectedSize: ", selectedSize);
  }, [selectedSize]);

  const { id } = useParams();

  useEffect(() => {
    const found = Product.find((item) => parseInt(item?.id) === parseInt(id));

    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSingleProduct(found);
    }
  }, [Product, id]);

  return (
    <Layout>
      <div className="border border-white flex flex-row items-center justify-evenly gap-2 py-2 px-8 min-h-screen">
        <div>
          <img
            src={singleProduct?.image}
            alt="Sneaker Image"
            className="w-120"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p className="text-5xl text-black font-bold">{singleProduct?.name}</p>
          <p className="text-3xl text-black">${singleProduct?.price}</p>
          <p className="text-lg text-gray-600">{singleProduct?.category}</p>
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-black">Quantity</p>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="border-2 border-gray-800 w-12 text-center text-2xl  aspect-square"
              defaultValue={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-black">Size</p>
            <div className="flex flex-row gap-2">
              {singleProduct && (
                <>
                  {singleProduct?.sizes?.map((size, i) => (
                    <div
                      key={i}

                      onClick={()=>setSelectedSize(size)}
                      className={` ${selectedSize === size ? "bg-red-500 text-white" : "border-2 border-black"} w-12 text-center text-2xl  aspect-square cursor-pointer`}
                    >
                      {size}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => AddToCart(singleProduct, quantity, selectedSize)}
            className="bg-black px-4 py-2 text-xl text-white rounded-md text-center w-full cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProducts;