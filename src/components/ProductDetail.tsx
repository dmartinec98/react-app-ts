import Product from "../models/Product";

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img width={300} src={product.thumbnail} alt={product.title} />
      <p className="text-lg mt-4">${product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
