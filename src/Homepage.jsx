import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import first from "./assest/images (1).jpg";
import second from "./assest/secondimage.jpg";
import third from "./assest/third.jpg";
import fourth from "./assest/fourth.jpg";
import fifth from "./assest/fifth.jpg";
import Search from "./assest/search icon.png";
import { HomeItems } from "./HomeProductsapi";

export const Home = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["homeItems"],
    queryFn: HomeItems,
    staleTime: Infinity,
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 200;

  useEffect(() => {
    setProducts(data);
    setPage(1);
  }, [data]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(start, end);
  const TOTAL_PAGES = Math.ceil(products.length / ITEMS_PER_PAGE);

  const images = [first, second, third, fourth, fifth];
  const paths = ["/main/turkeybreast", "/main/gh", "/main/nn", "/main/aa", "/main/xx"];

  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      setMaxDrag(containerRef.current.offsetWidth - sliderRef.current.scrollWidth);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    setProducts(
      data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const filterCategory = (cat) => {
    if (cat === "All") {
      setProducts(data);
      return;
    }
    setPage(1);
    setProducts(
      data.filter((item) =>
        item.category.toLowerCase().includes(cat.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-[#131921] min-h-screen ">
      {/* SEARCH BAR */}
      <div className="sticky top-0 z-50 bg-[#131921] p-2 flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Search Amazon.in"
          value={search}
          onChange={handleSearch}
          className="w-full sm:max-w-2xl h-10 px-3 rounded-md sm:rounded-r-none outline-none"
        />
        <button className="bg-[#febd69] h-10 px-4 rounded-md sm:rounded-l-none">
          <img src={Search} className="w-5" alt="" />
        </button>
      </div>

      {/* CATEGORY BAR */}
      <div className="flex gap-4 overflow-x-auto bg-[#232f3e] text-white px-4 py-2 text-sm sm:text-base">
        {["Electronics", "Mobile", "Gaming", "Audio", "TV", "All"].map((cat) => (
          <button
            key={cat}
            onClick={() => filterCategory(cat)}
            className="whitespace-nowrap hover:underline"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* HERO SLIDER */}
      <div ref={containerRef} className="overflow-hidden mt-4">
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          className="flex"
        >
          {images.map((img, i) => (
            <div key={i} className="w-screen flex-shrink-0">
              <NavLink to={paths[i]}>
                <motion.img
                  src={img}
                  className="w-full h-[180px] sm:h-[250px] md:h-[320px] object-cover"
                  whileHover={{ scale: 1.02 }}
                  alt=""
                />
              </NavLink>
            </div>
          ))}
        </motion.div>
      </div>

      {/* PRODUCTS */}
      {isLoading ? (
        <h1 className="text-center text-white mt-10 text-xl">Loading...</h1>
      ) : (
        <div className="mt-6 px-3 sm:px-6">
          <h2 className="text-white text-sm sm:text-lg mb-3">
            Showing {start + 1} – {Math.min(end, products.length)} of{" "}
            {products.length}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {paginatedProducts.map((product) => (
              <NavLink
                key={product.id}
                to={`display/${product.id}`}
                className="bg-white p-3 rounded hover:shadow-lg"
              >
                <img
                  src={product.thumbnail}
                  className="h-40 mx-auto object-contain"
                  alt={product.title}
                />
                <p className="text-sm mt-2 line-clamp-2">
                  {product.title}
                </p>
                <p className="font-bold text-lg mt-1">₹{product.price}</p>
                <p className="text-green-600 text-xs">Free Delivery</p>
              </NavLink>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-white mt-2">
              Page {page} / {TOTAL_PAGES}
            </span>

            <button
              disabled={page === TOTAL_PAGES}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
