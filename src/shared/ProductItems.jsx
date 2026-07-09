import { useContext, useEffect, useState } from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductProvider";

const ProductItems = ({ Product }) => {
  const [few, setFew] = useState([]);
  const [show, setShow] = useState(false);
  const { AddToCart } = useContext(ProductContext);

  useEffect(() => {
    const sliced = Product?.slice(0, 15);
    if (sliced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFew(sliced);
    }
  }, [Product]);

  useEffect(() => {
    console.log(`show: ${show}`);
  }, [show]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
        {show ? (
          <>
            {Product?.map((prod, i) => (
              <div
                key={i}
                className="  rounded-md shadow-md overflow-hidden hover:scale-105 transition ease-in-out duration-300"
              >
                <Link
                  style={{
                    backgroundImage: `url("${prod.image}")`,
                  }}
                  className="h-[300px] w-full block"
                  to={prod.name}
                ></Link>

                <div className="bg-white p-2 flex justify-between items-center">
                  <div className="">
                    <p>{prod.name}</p>
                    <p>{prod.price}</p>
                  </div>
                  <div className=" flex justify-between items-center gap-4">
                    <span className="cursor-pointer">
                      <FaHeart className="h-7 w-7" />
                    </span>
                    <span
                      onClick={() => AddToCart(prod, prod?.dedefaultSize)}
                      className="cursor-pointer"
                    >
                      <FaCartShopping className="h-7 w-7" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {few?.map((prod, i) => (
              <div
                key={i}
                className="  rounded-md shadow-md overflow-hidden hover:scale-105 transition ease-in-out duration-300"
              >
                <Link
                  style={{
                    backgroundImage: `url("${prod.image}")`,
                  }}
                  className="h-[300px] w-full block"
                  to={`singleproduct/${prod?.id}`}
                ></Link>

                <div className="bg-white p-2 flex justify-between items-center">
                  <div className="">
                    <p>{prod.name}</p>
                    <p>{prod.price}</p>
                  </div>
                  <div className=" flex justify-between items-center gap-4">
                    <span className="cursor-pointer">
                      <FaHeart className="h-7 w-7" />
                    </span>
                    <span
                      onClick={() => AddToCart(prod, prod?.dedefaultSize)}
                      className="cursor-pointer"
                    >
                      <FaCartShopping className="h-7 w-7" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center items-center p-4 gap-4 mt-3">
        <span
          onClick={() => setShow(false)}
          className="p-4 bg-black text-white font-semibold  rounded-md cursor-pointer"
        >
          Less
        </span>
        <span
          onClick={() => setShow(true)}
          className="p-4 bg-black text-white font-semibold rounded-md cursor-pointer"
        >
          More
        </span>
      </div>
    </div>
  );
};

export default ProductItems;