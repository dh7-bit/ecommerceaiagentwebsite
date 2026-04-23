import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Turkeybreast } from "./turkeybreatsapi";
import Location from "./assest/download (1).png";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";

export const Turkey = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [showLocation, setShowLocation] = useState(false);

  const itemsPerPage = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["turkey"],
    queryFn: Turkeybreast,
    staleTime: Infinity,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6">Error fetching data</p>;

  return (
    <div className="min-h-screen bg-[#EAEDED]">

      {/* LOCATION BAR */}
      <div
        onClick={() => setShowLocation(true)}
        className="bg-[#232F3E] text-white flex items-center gap-2 px-4 py-2 cursor-pointer"
      >
        <img src={Location} className="w-5" />
        <p className="text-sm">
          Delivering to Kozhikode 673004 – <span className="underline">Update location</span>
        </p>
      </div>

      {/* BACK BUTTON */}
      <div className="px-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
        >
          ← Back
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6 ${
          showLocation ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        {data
          .slice(startIndex, startIndex + itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded p-4 hover:shadow-lg transition"
            >
              <NavLink to={`Display/${product.id}`}>
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain"
                  />
                </div>
              </NavLink>

              <h2 className="text-sm mt-3 line-clamp-2 hover:text-orange-500">
                {product.title}
              </h2>

              <p className="text-lg font-semibold mt-1">
                ₹{product.price}
              </p>

              <p className="text-xs text-green-600 mt-1">
                FREE Delivery by Amazon
              </p>
            </div>
          ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 pb-8">
        <button
          disabled={startIndex === 0}
          onClick={() => setStartIndex(startIndex - itemsPerPage)}
          className="px-4 py-2 bg-white border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={startIndex + itemsPerPage >= data.length}
          onClick={() => setStartIndex(startIndex + itemsPerPage)}
          className="px-4 py-2 bg-white border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* LOCATION DRAWER */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: showLocation ? "20%" : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 w-full bg-[#131921] p-6 rounded-t-2xl z-50"
      >
        <h1 className="text-white text-xl font-semibold">
          Choose your location
        </h1>
        <p className="text-gray-300 text-sm mt-2">
          Select a delivery location to see product availability and delivery options.
        </p>

        <button className="w-full mt-4 bg-yellow-400 py-2 rounded font-medium">
          Sign in to see your addresses
        </button>

        <button
          onClick={() => setShowLocation(false)}
          className="w-full mt-2 text-white text-sm"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};
