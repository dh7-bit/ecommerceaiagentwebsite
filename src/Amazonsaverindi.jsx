import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./Store";

export const Amazonindi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const product = data.find((item) => item.id == id);

  const dispatch = useDispatch();

  const [popupVisible, setPopupVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const quantities = Array.from({ length: 100 }, (_, i) => i + 1);

  if (!product) {
    return (
      <div className="bg-[#131921] min-h-screen flex flex-col items-center justify-center text-white">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 px-4 py-2 rounded mb-4"
        >
          ← Back
        </button>
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addTask({
        id: product.id,
        image: product.image,
        unitprice: product.price,
        price: product.price * quantity,
        quantity: quantity,
        details: product.description,
         category:product.category
      })
    );
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
  };

  return (
    <div className="bg-[#131921] min-h-screen text-white pt-[72px] px-4 md:px-8 pb-24">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 px-4 py-2 rounded text-black mb-4"
      >
        ← Back
      </button>

      {/* Product Info */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md object-contain rounded bg-white p-4"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-300 mb-4">{product.description}</p>

          <div className="text-3xl text-orange-400 mb-2">₹{product.price}</div>
          <p className="text-sm text-gray-300 mb-4">Inclusive of all taxes</p>
          <p className="text-sm text-gray-300 mb-4">EMI from ₹79. No Cost EMI available.</p>

          {/* Quantity selector */}
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32 p-2 mb-4 rounded bg-gray-700 text-white"
          >
            {quantities.map((q) => (
              <option key={q} value={q}>
                Quantity: {q}
              </option>
            ))}
          </select>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 py-3 rounded text-black font-bold mb-6 hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>

          {/* Shop with Confidence */}
          <div className="bg-gray-700 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 italic">Shop with Confidence</h2>
            <div className="grid grid-cols-2 text-sm text-[#87CEEB] gap-2">
              <div>10 Days Return & Exchange</div>
              <div>Free Delivery</div>
              <div>Amazon Delivered</div>
              <div>Secure Transaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupVisible && (
          <motion.div
            key="popup"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-b-xl shadow-lg z-50"
          >
            🛒 Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
