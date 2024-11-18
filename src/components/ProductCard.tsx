import Product from "../models/Product";

const ProductCard = ({
  product,
  onDetailsClick,
}: {
  product: Product;
  onDetailsClick: () => void;
}) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} has been added to your cart!`);
  };

  return (
    <div className="bg-gray-100 p-10 rounded-3xl shadow-xl justify-items-center">
      <img width={200} src={product.thumbnail} alt={product.title} />
      <p className="text-2xl font-bold mb-3 ">{product.title}</p>
      <p className="text-xl font-bold mb-3 ">${product.price}</p>
      <p className="mb-3 ">{product.description}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onDetailsClick}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Details
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
