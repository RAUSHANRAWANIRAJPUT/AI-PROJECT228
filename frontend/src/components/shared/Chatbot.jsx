import React, { useState, useRef, useEffect } from 'react';

const botReplies = {
  default: [
    "I can help with that! Give me a dish name or describe what you're craving and I'll craft a detailed recipe for you.",
    "Great question! For the best results, also mention any dietary preferences or available ingredients.",
    "I'm on it! Powered by OpenRouter AI, I can generate recipes from virtually any cuisine in the world."
  ],
  pasta: ["🍝 **Spaghetti Aglio e Olio**\n\n**Ingredients:** Spaghetti, garlic, olive oil, chilli flakes, parsley, parmesan\n\n**Steps:**\n1. Cook spaghetti al dente\n2. Sauté thinly sliced garlic in olive oil\n3. Add chilli flakes\n4. Toss pasta in the oil\n5. Finish with parsley & parmesan\n\n⏱ 20 min | Serves 2"],
  chicken: ["🍗 **Garlic Butter Chicken**\n\n**Ingredients:** Chicken breasts, butter, garlic, lemon, thyme, salt, pepper\n\n**Steps:**\n1. Season chicken with salt & pepper\n2. Sear in butter 5 min each side\n3. Add garlic and thyme\n4. Baste with pan juices\n5. Finish with lemon squeeze\n\n⏱ 30 min | Serves 2"],
  rice: ["🍚 **Egg Fried Rice**\n\n**Ingredients:** Cooked rice, eggs, soy sauce, sesame oil, spring onions, peas\n\n**Steps:**\n1. Heat wok on high\n2. Scramble eggs in oil\n3. Add rice, break up clumps\n4. Splash soy sauce & sesame oil\n5. Toss in peas and spring onions\n\n⏱ 15 min | Serves 2"],
};

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "👋 Hello! I'm your AI Chef. Tell me a dish you want to make and I'll give you a complete step-by-step recipe with tips and tricks!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const msgsEndRef = useRef(null);

  const scrollToBottom = () => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = botReplies.default[Math.floor(Math.random() * botReplies.default.length)];
      const low = userMsg.toLowerCase();
      
      if (low.includes('pasta') || low.includes('spaghetti') || low.includes('noodle')) {
        reply = botReplies.pasta[0];
      } else if (low.includes('chicken')) {
        reply = botReplies.chicken[0];
      } else if (low.includes('rice') || low.includes('fried')) {
        reply = botReplies.rice[0];
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-dark/50 flex items-end justify-center md:items-center md:justify-end md:p-8" onClick={onClose}>
      <div 
        className="bg-card w-full h-[80vh] md:w-[400px] md:h-[600px] rounded-t-3xl md:rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-fade-in-up" 
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-dark text-cream p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👨‍🍳</div>
            <div>
              <h4 className="font-bold text-sm">AI Chef</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-400">Powered by OpenRouter</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-cream/70 hover:text-cream text-xl font-bold p-1">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'bot' 
                ? 'bg-white text-dark border border-border self-start rounded-bl-none shadow-sm whitespace-pre-line' 
                : 'bg-dark text-cream self-end rounded-br-none ml-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="bg-white text-dark border border-border self-start rounded-2xl rounded-bl-none p-4 shadow-sm w-16">
              <div className="flex gap-1 justify-center">
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>
        
        <div className="p-4 border-t border-border flex gap-2 bg-white">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about any recipe..."
            className="flex-1 bg-cream border-1.5 border-border rounded-xl px-4 py-2 text-sm focus:border-gold outline-none transition-colors"
          />
          <button 
            onClick={handleSend}
            className="bg-dark text-cream w-10 h-10 rounded-xl flex items-center justify-center hover:bg-olive transition-colors cursor-pointer"
          >
            <span className="rotate-0 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
