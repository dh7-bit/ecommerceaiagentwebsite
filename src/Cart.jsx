import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, decreaseTask, deleteitem } from "./Store";

export const Cart = () => {
  const cartFromRedux = useSelector((state) => state.task.task) || [];
  const cartFromLocal = JSON.parse(localStorage.getItem("cart") || "[]");
  const fg = cartFromRedux.length ? cartFromRedux : cartFromLocal;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incre = (curr) => {
    dispatch(
      addTask({
        ...curr,
        quantity: curr.quantity + 1,
        price: curr.unitPrice * (curr.quantity + 1),
      })
    );
  };

  const dec = (curr) => {
    if (curr.quantity === 1) {
      dispatch(deleteitem({ id: curr.id }));
    } else {
      dispatch(
        decreaseTask({
          ...curr,
          quantity: curr.quantity - 1,
          price: curr.unitPrice * (curr.quantity - 1),
        })
      );
    }
  };

  return (
    /* ✅ PAGE BACKGROUND */
    <div className="min-h-screen bg-[#131921] pb-24">

      {/* HEADER */}
      <div className="text-center pt-6">
        <h1 className="text-orange-400 text-2xl font-semibold">
          YOUR CART HAS {fg.length} ITEMS
        </h1>
      </div>

      {/* CART CONTAINER */}
      <div className="max-w-4xl mx-auto mt-6">
        {fg.map((curr) => (
          <div key={curr.id} className="px-4 mb-6">

            {/* ITEM CARD */}
            <div className="flex gap-4 bg-[#1f2937] p-4 rounded-xl shadow-md">

              <img
                src={curr.image}
                alt={curr.title}
                className="w-28 h-24 md:w-36 md:h-28 object-contain bg-white rounded"
              />

              <div className="flex-1">
                <p className="text-white italic line-clamp-2">
                  {curr.title}
                </p>

                <p className="text-white text-xl mt-2">
                  ₹{curr.price.toFixed(2)}
                </p>

                <p className="text-green-400 text-sm">In Stock</p>

                {/* CONTROLS */}
                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => dec(curr)}
                    className="px-3 py-1 bg-orange-400 rounded text-black font-bold"
                  >
                    −
                  </button>

                  <span className="text-white font-semibold">
                    {curr.quantity}
                  </span>

                  <button
                    onClick={() => incre(curr)}
                    className="px-3 py-1 bg-orange-400 rounded text-black font-bold"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(deleteitem({ id: curr.id }))}
                    className="ml-auto px-4 py-1 border border-orange-400 text-orange-400 rounded hover:bg-orange-400 hover:text-black transition"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    <div className="text-center mt-8 flex flex-col md:flex-row justify-center gap-4">
  <button
    onClick={() => navigate(-2)}
    className="px-6 py-2 bg-orange-500 rounded font-bold text-black"
  >
    Continue Shopping
  </button>

  <button
    // onClick={() => handlePurchase()} // Call purchase function
    className="px-6 py-2 bg-green-500 rounded font-bold text-black hover:bg-green-600 transition"
  >
    Purchase
  </button>
</div>
    </div>
  );
};
