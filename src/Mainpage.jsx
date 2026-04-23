import { useState, useRef, useEffect } from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

export const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I am your AI assistant. Ask me anything!" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const location = useLocation();

  // Auto scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:10000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.answer || "No response",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠ Error connecting to server" },
      ]);
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-[72px] bg-[#131921] min-h-screen">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Chat Button */}
      <div
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer z-[1000]"
      >
        💬
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col z-[1000]">

          {/* Header */}
          <div className="bg-blue-600 text-white p-2 flex justify-between items-center rounded-t-xl">
            <span>AI Assistant</span>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto text-sm space-y-2">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "text-right"
                    : "text-left"
                }
              >
                <div
                  className={
                    msg.role === "user"
                      ? "inline-block bg-blue-500 text-white px-2 py-1 rounded-lg"
                      : "inline-block bg-gray-200 text-black px-2 py-1 rounded-lg"
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-left">
                <div className="inline-block bg-gray-200 px-2 py-1 rounded-lg text-gray-600">
                  AI is typing...
                </div>
              </div>
            )}

            {/* Auto scroll anchor */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-2 flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
};