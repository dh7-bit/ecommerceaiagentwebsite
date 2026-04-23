import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./Store";

export const Fifthind = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const productArr = data.filter((curr) => curr.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(true);

  const dispatch = useDispatch();

  const quantities = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleAddToCart = (product) => {
    const cartItem = {
      image: product.image,
      unitPrice: product.price,
      price: product.price * quantity,
      quantity,
      id: product.id,
      details: product.description,
       category:product.category
    };

    dispatch(addTask(cartItem));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="bg-[#131921] min-h-screen text-white pt-[72px] px-4 md:px-8 pb-16">
      {productArr.map((product) => (
        <div key={product.id} className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 text-black px-4 py-2 rounded mb-6 hover:bg-orange-600 transition"
          >
            ← Go Back
          </button>

          {/* Product Info */}
          <h2 className="text-xl md:text-2xl font-semibold mb-4">{product.description}</h2>
          <div className="flex justify-center mb-6">
            <img
              src={product.image}
              alt={product.description}
              className="w-72 md:w-96 object-contain rounded-lg shadow-lg"
            />
          </div>

          <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
            ${product.price}
          </div>
          <p className="text-gray-300 mb-1">EMI from $79. No Cost EMI available.</p>
          <p className="text-gray-300 mb-4">Inclusive of all taxes</p>

          {/* Quantity Selector */}
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32 p-2 rounded bg-gray-800 text-white mb-4"
          >
            {quantities.map((q) => (
              <option key={q} value={q}>
                Quantity: {q}
              </option>
            ))}
          </select>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg font-bold mb-6"
          >
            Add to Cart
          </button>

          {/* Shop with Confidence */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-white italic text-lg mb-2">Shop with Confidence</div>
            <div className="grid grid-cols-2 text-blue-300 text-sm md:text-base gap-y-2">
              <div>10 Days Return & Exchange</div>
              <div>Free Delivery</div>
              <div>Amazon Delivered</div>
              <div>Secure Transaction</div>
            </div>
          </div>
        </div>
      ))}

      {/* Add to Cart Popup */}
      <AnimatePresence>
        {!showPopup && (
          <motion.div
            key="popup"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-b-xl shadow-lg z-[9999]"
          >
            🛒 Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
