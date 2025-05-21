import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Smile, Send, Info, X, User, CheckCircle } from "lucide-react";

const initialMessages = [
  {
    type: "user",
    name: "Tom Simone",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "I'd like a refund, the sweater I received has a torn sleeve.",
    time: "1m",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    type: "agent",
    name: "Fin",
    avatar: "/logo192.png",
    content: "Sorry about that! I see your order #56789 is a merino sweater. This needs a team member's approval, so I'll transfer you now.",
    time: "1m",
  },
  {
    type: "summary",
    content: "Refund request for order #56789 due to a torn sleeve. Order is fulfilled—needs approval.",
    time: "1m",
  },
];

const ChatWindow = ({ showDetailsButton, onShowDetails }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          type: "agent",
          name: "You",
          avatar: "/logo192.png",
          content: input,
          time: "now",
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f7fafc] h-full overflow-y-auto">
      {/* Chat header */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between bg-white relative">
        <div className="flex items-center gap-3">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Tom Simone" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-gray-800 text-base flex items-center gap-1">Tom Simone <CheckCircle className="text-green-500" size={18} /></div>
            <div className="text-xs text-gray-500">1m ago</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showDetailsButton && (
            <button
              className="block xl:hidden bg-white border border-gray-300 rounded px-3 py-1 shadow hover:bg-gray-100 transition"
              onClick={onShowDetails}
            >
              Show Details
            </button>
          )}
          <button className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-1 transition"><X size={18} /> Close</button>
        </div>
      </div>
      {/* Chat messages */}
      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto bg-white">
        {messages.map((msg, idx) =>
          msg.type === "summary" ? (
            <div
              key={idx}
              className="flex items-center gap-2 animate-fade-in"
            >
              <div className="bg-yellow-100 border-l-4 border-yellow-400 px-4 py-2 rounded shadow flex-1 flex items-center gap-2">
                <Info className="text-yellow-500" size={20} />
                <div>
                  <div className="font-semibold text-yellow-800 mb-1">Summary</div>
                  <div className="text-yellow-900 text-sm">{msg.content}</div>
                </div>
              </div>
              <span className="text-xs text-gray-400 self-end">{msg.time}</span>
            </div>
          ) : (
            <div key={idx} className={`flex ${msg.type === "user" ? "justify-start" : "justify-end"}`}> 
              <div className={`flex flex-col gap-1 max-w-md ${msg.type === "user" ? "items-start" : "items-end"}`}>
                <div className="flex items-center gap-2">
                  <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-xs text-gray-500">{msg.name}</span>
                </div>
                {msg.image && (
                  <img src={msg.image} alt="attachment" className="w-40 h-32 object-cover rounded-lg border" />
                )}
                <div className={`px-5 py-3 rounded-2xl shadow ${msg.type === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-800 border"} animate-scale-in`}>{msg.content}</div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Reply box */}
      <div className="px-4 py-4 border-t border-gray-200 bg-white flex items-center gap-2 animate-fade-in">
        <button className="p-2 rounded hover:bg-gray-100 transition"><Paperclip size={20} /></button>
        <button className="p-2 rounded hover:bg-gray-100 transition"><Smile size={20} /></button>
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-semibold hover:bg-blue-700 transition text-base flex items-center gap-1 animate-scale-in"
          onClick={handleSend}
        >
          <Send size={20} /> Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow; 