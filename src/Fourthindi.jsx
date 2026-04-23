import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./Store";

export const Fourthind = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const product = data.find((p) => p.id == id);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addTask({
        image: product.image,
        unitPrice: product.price,
        price: product.price * quantity,
        quantity,
        id: product.id,
        details: product.description,
         category:product.category
      })
    );
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const quantities = Array.from({ length: 100 }, (_, i) => i + 1);

  if (!product) {
    return (
      <div className="bg-[#131921] min-h-screen text-white p-6">
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

  return (
    <div className="bg-[#131921] min-h-screen text-white p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-400 text-black px-4 py-2 rounded mb-4"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-300 mt-2">{product.description}</p>

          <div className="text-3xl text-orange-400 mt-4">₹{product.price}</div>
          <p className="mt-1 text-gray-300">Inclusive of all taxes</p>
          <p className="mt-2 text-green-400">EMI from ₹79 - No Cost EMI available</p>

          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-4 p-2 rounded bg-gray-700 text-white w-32"
          >
            {quantities.map((q) => (
              <option key={q} value={q}>
                Qty: {q}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            className="w-full mt-6 py-3 bg-orange-500 rounded text-black font-bold"
          >
            Add to Cart
          </button>

          <div className="mt-6 bg-gray-800 p-4 rounded">
            <p className="italic text-white text-lg">Shop with Confidence</p>
            <div className="grid grid-cols-2 mt-4 text-blue-300">
              <p>10 days Return & Exchange</p>
              <p>Free Delivery</p>
              <p>Amazon Delivered</p>
              <p>Secure transaction</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-b-xl shadow-lg z-[9999]"
          >
            🛒 Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
