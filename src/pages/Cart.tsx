import { useEffect, useState } from "react";
import Product from "../models/Product";

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="py-2 px-4 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
