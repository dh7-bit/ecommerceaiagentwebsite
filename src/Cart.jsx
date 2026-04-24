import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, decreaseTask, deleteitem } from "./Store";

export const Cart = () => {
  const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
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



const handlePurchase = async () => {
  const sdkLoaded = await loadRazorpayScript();

  if (!sdkLoaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    // 1. Create order in backend
    const res = await fetch("https://ecommerceaiagentwebsites.onrender.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        cart: fg,
        amount: Math.round(
  fg.reduce((acc, item) => acc + item.price, 0) * 100)
      }),
    });

    const order = await res.json();

    // 2. Razorpay options
    const options = {
      key: "rzp_test_R65lJ9poc06w6e",
      amount: order.amount,
      currency: "INR",
      name: "My Store",
      description: "Cart Purchase",
      order_id: order.id,

      handler: async function (response) {
        // 3. Verify payment
        const verify = await fetch(
          "https://ecommerceaiagentwebsites.onrender.com/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              ...response,
              cart: fg,
              amount: order.amount,
            }),
          }
        );

        if (verify.ok) {
          alert("Payment Successful 🎉");

          // 4. CLEAR CART (Redux + LocalStorage)
          localStorage.removeItem("cart");

          fg.forEach((item) => {
            dispatch(deleteitem({ id: item.id }));
          });

          navigate("/");
        } else {
          alert("Payment verification failed");
        }
      },

      theme: { color: "#ff9900" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Payment failed");
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
  onClick={handlePurchase}
  className="px-6 py-2 bg-green-500 rounded font-bold text-black hover:bg-green-600 transition"
>
  Purchase
</button>
</div>
    </div>
  );
};
