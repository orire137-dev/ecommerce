import { useContext } from "react";
import { FaTrash } from "react-icons/fa";

import Layout from "../shared/Layout";
import { ProductContext } from "../Context/ProductProvider";

const Checkout = () => {
  const shippingFee = 3000;
  const { CartItems, DeleteCart, UpdateCart } = useContext(ProductContext);

  const subtotal = CartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const total = subtotal + shippingFee;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h1 className="text-3xl font-bold mb-6">
              Shopping Cart ({CartItems?.length})
            </h1>

            {CartItems?.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              </div>
            ) : (
              <div className="space-y-6">
                {CartItems?.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row gap-4 border-b pb-6"
                  >
                    {/* Image */}
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full md:w-36 h-36 object-cover rounded-xl"
                    />

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{item?.name}</h2>

                        <p className="text-gray-500 capitalize">
                          Category: {item?.category}
                        </p>

                        <p className="text-gray-500">
                          Size: {item?.defaultSize}
                        </p>

                        <p className="font-bold text-lg mt-2">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity + Delete */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => {
                              if (item?.quantity === 1) {
                                DeleteCart(item?.id);
                              } else {
                                UpdateCart(item, item?.quantity - 1);
                              }
                            }}
                            className="px-4 py-2 text-lg hover:bg-gray-100"
                          >
                            -
                          </button>

                          <span className="px-5 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => {
                              UpdateCart(item, item?.quantity + 1);
                            }}
                            className="px-4 py-2 text-lg hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => DeleteCart(item?.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-xl">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{CartItems?.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦{shippingFee.toLocaleString()}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              disabled={CartItems.length === 0}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 disabled:bg-gray-400"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;