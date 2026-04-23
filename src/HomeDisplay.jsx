import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTask } from "./Store";

export const Homes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const dispatch = useDispatch();

  /* ---------------- STATE ---------------- */
  const [showPopup, setShowPopup] = useState(false);
  const [qty, setQty] = useState(1);

  /* ---------------- PRODUCT ---------------- */
  const product = data.find((item) => item.id === Number(id));

  const [mainImg, setMainImg] = useState(
    product ? product.thumbnail : ""
  );

  if (!product) {
    return (
      <div className="bg-[#131921] min-h-screen text-white p-10">
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

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = () => {
    dispatch(
      addTask({
        id: product.id,
        title: product.title,
        image: mainImg,
        unitPrice: product.price,
        quantity: qty,
        price: product.price * qty,
        category:product.category
      })
    );

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="bg-[#131921] min-h-screen text-white pb-24">

      {/* ================= TOP BAR ================= */}
      <div className="sticky top-0 z-40 bg-[#131921] border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:text-orange-400"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:block">Back</span>
          </button>

          <span className="text-sm text-gray-400 truncate">
            {product.title}
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">

        {/* IMAGE */}
        <div className="bg-white rounded p-4">
          <img
            src={mainImg}
            alt={product.title}
            className="w-full h-[300px] object-contain"
          />

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-contain border cursor-pointer ${
                  mainImg === img ? "border-orange-400" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <p className="text-gray-300 mt-2">
            {product.description}
          </p>

          <div className="text-3xl text-orange-400 mt-4">
            ₹{product.price}
          </div>

          <p className="text-sm text-green-400 mt-1">
            Inclusive of all taxes
          </p>

          {/* QUANTITY */}
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="mt-4 p-2 rounded bg-gray-800 text-white"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                Quantity: {i + 1}
              </option>
            ))}
          </select>

          {/* ADD TO CART */}
          <button
            onClick={addToCart}
            className="w-full bg-orange-500 mt-6 py-3 rounded text-black font-bold hover:bg-orange-600"
          >
            Add to Cart
          </button>

          {/* TRUST */}
          <div className="mt-6 bg-gray-800 p-4 rounded">
            <p>✔ Free Delivery</p>
            <p>✔ 10 Days Return</p>
            <p>✔ Amazon Delivered</p>
            <p>✔ Secure Transaction</p>
          </div>
        </div>
      </div>

      {/* ================= POPUP (FIXED) ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-1/2 -translate-x-1/2 
                       bg-green-600 text-white px-6 py-3 rounded-md 
                       z-[2000] shadow-lg"
          >
            🛒 Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
