import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Product from "../models/Product";
import { fetchProducts } from "../services/ProductService";
import Modal from "../components/Modal";
import ProductDetail from "../components/ProductDetail";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [priceSort, setPriceSort] = useState<string>("default");
  const [nameSort, setNameSort] = useState<string>("default");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 20;

  const handleDetailsClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsFetching(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setIsFetching(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    setCurrentPage(1);
    filterProducts(
      searchQuery,
      selectedCategory,
      priceRange,
      priceSort,
      nameSort
    );
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);
    filterProducts(query, category, priceRange, priceSort, nameSort);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const range = event.target.value;
    setPriceRange(range);
    setCurrentPage(1);
    filterProducts(query, selectedCategory, range, priceSort, nameSort);
  };

  const handlePriceSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sort = event.target.value;
    setPriceSort(sort);
    filterProducts(query, selectedCategory, priceRange, sort, nameSort);
  };

  const handleNameSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sort = event.target.value;
    setNameSort(sort);
    filterProducts(query, selectedCategory, priceRange, priceSort, sort);
  };

  const filterProducts = (
    searchQuery: string,
    category: string,
    range: string,
    priceSort: string,
    nameSort: string
  ) => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price range
    if (range !== "All") {
      filtered = filtered.filter((product) => {
        const price = product.price;
        if (range === "10-50") return price >= 10 && price <= 50;
        if (range === "50-100") return price > 50 && price <= 100;
        if (range === "100+") return price > 100;
        return true;
      });
    }

    // Sort by price
    if (priceSort === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    // Sort by name
    if (nameSort === "name-asc") {
      filtered = filtered.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
    } else if (nameSort === "name-desc") {
      filtered = filtered.sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
      );
    }

    setFilteredProducts(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-bold mb-2">Filter and Sort Products</h1>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block p-2 border border-gray-300 rounded-lg"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="block p-2 border border-gray-300 rounded-lg"
          >
            <option value="All">All Prices</option>
            <option value="10-50">$10 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>

          <select
            value={priceSort}
            onChange={handlePriceSortChange}
            className="block p-2 border border-gray-300 rounded-lg"
          >
            <option value="default">Sort by Price</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <select
            value={nameSort}
            onChange={handleNameSortChange}
            className="block p-2 border border-gray-300 rounded-lg"
          >
            <option value="default">Sort by Name</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-gray-500">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="m-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {currentItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDetailsClick={() => handleDetailsClick(product)}
              ></ProductCard>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModal}>
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </Modal>
      )}
    </>
  );
};

export default Home;
