import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { addTask } from "./Store";
import { motion, AnimatePresence } from "framer-motion";
import { Turkeybreast } from "./turkeybreatsapi";

export const Displays = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const { data } = useQuery({
    queryKey: ["turkey"],
    queryFn: Turkeybreast,
    staleTime: Infinity,
  });

  const product = data?.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="pt-[72px] text-white p-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-400 text-black px-4 py-2 rounded"
        >
          ← Back
        </button>
        <p className="mt-6">Product not found</p>
      </div>
    );
  }

  const addToCart = () => {
    dispatch(
      addTask({
        id: product.id,
        image: product.image,
        unitPrice: product.price,
        quantity: qty,
        price: product.price * qty,
        details: product.description,
        category:product.category
      })
    );
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="bg-[#EAEDED] min-h-screen pt-[72px] pb-24">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to results
        </button>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        
        {/* Image Section */}
        <div className="bg-white p-6 rounded">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[350px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="lg:col-span-1 bg-white p-6 rounded">
          <h1 className="text-xl font-semibold">{product.title}</h1>

          <div className="flex items-center gap-2 mt-2">
            <StarRatings
              rating={product.rating.rate}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="16px"
              starSpacing="2px"
            />
            <span className="text-sm text-blue-600">
              {product.rating.count} ratings
            </span>
          </div>

          <hr className="my-4" />

          <p className="text-sm text-gray-700">{product.description}</p>

          <div className="text-3xl text-red-600 mt-4">
            ₹{product.price}
          </div>

          <p className="text-sm mt-2">
            Inclusive of all taxes
          </p>

          <p className="text-sm mt-1">
            EMI starts at ₹79. No Cost EMI available
          </p>
        </div>

        {/* Buy Box (Amazon style) */}
        <div className="bg-white p-6 rounded h-fit sticky top-[90px]">
          <div className="text-2xl text-red-600 mb-2">
            ₹{product.price}
          </div>

          <p className="text-sm mb-2">
            FREE delivery <span className="font-semibold">Tomorrow</span>
          </p>

          <p className="text-green-700 font-semibold mb-4">
            In stock
          </p>

          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border p-2 rounded mb-4"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                Quantity: {i + 1}
              </option>
            ))}
          </select>

          <button
            onClick={addToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold mb-3"
          >
            Add to Cart
          </button>

          <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded font-semibold">
            Buy Now
          </button>

          <div className="mt-6 text-sm space-y-2">
            <p>✔ Secure transaction</p>
            <p>✔ Amazon Delivered</p>
            <p>✔ 10 days Return & Exchange</p>
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-b-xl z-[9999]"
          >
            🛒 Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
