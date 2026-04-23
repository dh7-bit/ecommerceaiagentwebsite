import { useQuery } from "@tanstack/react-query";
import { Saverapi } from "./Amazonsaverapi";
import { NavLink, useNavigate } from "react-router-dom";

export const Saver = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["saver"],
    queryFn: Saverapi,
    staleTime: Infinity,
  });

  if (isLoading) return <h1 className="text-white text-center mt-10">Loading...</h1>;
  if (isError) return <h1 className="text-white text-center mt-10">Error fetching data</h1>;

  return (
    <div className="bg-[#131921] min-h-screen pt-[72px] px-4 pb-24">
      {/* Back button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
        >
          ← Back to previous page
        </button>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            <NavLink to={`${product.id}`} className="flex justify-center p-4 bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-40 object-contain"
              />
            </NavLink>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-gray-900 font-semibold text-sm mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-red-600 font-bold text-lg mt-auto">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
