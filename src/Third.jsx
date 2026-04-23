import { useQuery } from "@tanstack/react-query";
import { Saverapi } from "./Amazonsaverapi";
import { NavLink, useNavigate } from "react-router-dom";

export const Third = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["saver"],
    queryFn: Saverapi,
  });

  if (isLoading)
    return (
      <div className="bg-[#131921] min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="bg-[#131921] min-h-screen flex items-center justify-center text-white">
        Error fetching data
      </div>
    );

  return (
    <div className="bg-[#131921] min-h-screen text-white pt-[72px] px-4 md:px-8 pb-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 px-4 py-2 rounded text-black mb-6 hover:bg-orange-600 transition"
      >
        ← Go Back
      </button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <NavLink to={`${product.id}`}>
              <div className="flex justify-center bg-white p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-40 object-contain"
                />
              </div>
              <div className="p-4 bg-[#131921]">
                <h2 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-orange-400 font-bold text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
