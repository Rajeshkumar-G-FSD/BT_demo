import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, X, CornerDownLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, FilterState } from '../types';

interface AuraChatProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  isDarkMode: boolean;
}

export default function AuraChat({
  isOpen,
  onClose,
  filterState,
  setFilterState,
  isDarkMode
}: AuraChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'aura',
      text: "Welcome to your elite property portal. I am Aura, your virtual luxury concierge. How may I assist you in discovering your perfect architectural escape today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Show me COONOOR properties",
    "Discover a heritage stay in KOTHAKIRI",
    "Hotels under $500,000",
    "Tell me about Lunar Oasis Villa"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // NLP engine to trigger dynamic dashboard actions!
  const getBotResponse = (input: string): { text: string; action?: any } => {
    const text = input.toLowerCase();
    let reply = "";
    let action: any = null;

    if (text.includes('coonoor')) {
      action = { type: 'FILTER_CHANGE', payload: { location: 'COONOOR' } };
      reply = "Certainly. I have updated your search location to COONOOR. Let's look at the spectacular mountain properties available, such as the Solaria Dome Haven.";
    } else if (text.includes('kothakiri')) {
      action = { type: 'FILTER_CHANGE', payload: { location: 'KOTHAKIRI', propertyType: 'Heritage Stays' } };
      reply = "Right away. Adjusting your portal to KOTHAKIRI. Behold the Nebula Glass Penthouse, a modern architectural heritage stay suspended dramatically over hilltops.";
    } else if (text.includes('ooty')) {
      action = { type: 'FILTER_CHANGE', payload: { location: 'OOTY' } };
      reply = "Splendid choice. Displaying OOTY estates. The iconic Lunar Oasis Villa is our signature luxury hotel architectural masterpiece.";
    } else if (text.includes('kodaikanal')) {
      action = { type: 'FILTER_CHANGE', payload: { location: 'KODAIKANAL' } };
      reply = "Updating your settings to KODAIKANAL. The natural warmth of the Canyon Echo Residence is highly recommended for design enthusiasts.";
    } else if (text.includes('hotel')) {
      action = { type: 'FILTER_CHANGE', payload: { propertyType: 'Hotel' } };
      reply = "Filtered to show only premium luxury Hotels. Notice the organic curved forms and open panoramic floor plans.";
    } else if (text.includes('heritage')) {
      action = { type: 'FILTER_CHANGE', payload: { propertyType: 'Heritage Stays' } };
      reply = "Refined search for executive Heritage Stays. Excellent taste. These properties offer historic architectural forms and luxury amenities.";
    } else if (text.includes('homestays') || text.includes('homestay')) {
      action = { type: 'FILTER_CHANGE', payload: { propertyType: 'HomeStays' } };
      reply = "Searching for sustainable high-design HomeStays. These organic spaces represent the absolute cutting edge of comfort and local immersion.";
    } else if (text.includes('service') || text.includes('apartment')) {
      action = { type: 'FILTER_CHANGE', payload: { propertyType: 'Service Apartments' } };
      reply = "Searching for boutique Service Apartments. Fully equipped residences for comfortable long-term stays.";
    } else if (text.includes('under 500') || text.includes('500,000') || text.includes('500k')) {
      action = { type: 'FILTER_CHANGE', payload: { maxPrice: 500000 } };
      reply = "Setting maximum price filter to $500,000. Displaying our select collection of architectural gems in this price range.";
    } else if (text.includes('under 300') || text.includes('300,000') || text.includes('300k')) {
      action = { type: 'FILTER_CHANGE', payload: { maxPrice: 300000 } };
      reply = "Setting price filter to $300,000. Our premium entry-tier, featuring the exquisite Lunar Oasis Villa.";
    } else if (text.includes('buy') || text.includes('purchase')) {
      action = { type: 'FILTER_CHANGE', payload: { offerType: 'Buy' } };
      reply = "Switching portal to Buy/Purchase options. Real estate is the finest long-term wealth store.";
    } else if (text.includes('rent') || text.includes('leasing')) {
      action = { type: 'FILTER_CHANGE', payload: { offerType: 'Rent' } };
      reply = "Switching portal to luxury monthly Rent options. Ideal for testing seasonal retreats.";
    } else if (text.includes('lunar') || text.includes('oasis')) {
      reply = "The Lunar Oasis Villa is a masterpiece located in OOTY. It spans 695m² of flowing curved glass structure, featuring 3 premium bedroom suites and 2 luxurious baths, complete with an outdoor infinity oasis.";
    } else {
      reply = "That is an intriguing inquiry. Our collection of premium architectural residences is curated specifically for visionary buyers. Would you like me to adjust the filters to show specific locations like COONOOR, OOTY, KOTHAKIRI, or KODAIKANAL?";
    }

    return { text: reply, action };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // 2. Trigger Bot Typing State
    setIsTyping(true);

    setTimeout(() => {
      const { text, action } = getBotResponse(textToSend);
      
      const botMsg: Message = {
        id: `msg-${Date.now()}-aura`,
        sender: 'aura',
        text,
        timestamp: new Date(),
        action
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // 3. Execute dashboard action if present
      if (action && action.type === 'FILTER_CHANGE') {
        setFilterState((prev) => ({
          ...prev,
          ...action.payload
        }));
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glass Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/20 backdrop-blur-sm z-40 rounded-[2.5rem]"
          />

          {/* Chat Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute right-4 top-4 bottom-4 w-96 rounded-[2rem] z-50 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border ${
              isDarkMode 
                ? 'bg-neutral-900/95 border-neutral-850 text-white' 
                : 'bg-white/95 border-neutral-100 text-neutral-800'
            } backdrop-blur-xl`}
          >
            {/* Header */}
            <div className={`p-5 flex items-center justify-between border-b ${isDarkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
              <div className="flex items-center gap-2.5">
                <div className="relative flex justify-center items-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide">Aura Concierge</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-neutral-400 font-medium">Virtual Assistant Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'}`}
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'aura';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2.5`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-neutral-950 text-primary flex items-center justify-center text-[10px] font-bold shadow-sm border border-neutral-800/20 shrink-0">
                        A
                      </div>
                    )}
                    <div className="flex flex-col max-w-[80%]">
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                        isBot
                          ? isDarkMode
                            ? 'bg-neutral-800/80 text-neutral-155 rounded-tl-none border border-neutral-800/40'
                            : 'bg-neutral-50 text-neutral-800 rounded-tl-none border border-neutral-150/50'
                          : isDarkMode
                            ? 'bg-primary text-white rounded-tr-none font-semibold'
                            : 'bg-neutral-900 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-neutral-400 dark:text-neutral-500 self-end mt-1 font-mono">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bot typing status */}
              {isTyping && (
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-neutral-950 text-primary flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0">
                    A
                  </div>
                  <div className={`p-3 rounded-2xl flex items-center gap-1.5 ${isDarkMode ? 'bg-neutral-800/80' : 'bg-neutral-50'} border ${isDarkMode ? 'border-neutral-800/40' : 'border-neutral-100'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-225" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Suggestions */}
            {messages.length < 4 && (
              <div className={`p-4 border-t ${isDarkMode ? 'border-neutral-800/50' : 'border-neutral-100/50'} space-y-2`}>
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Suggested Enquiries</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSend(p)}
                      className={`text-[10px] font-medium px-2.5 py-1.5 rounded-xl border text-left flex items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-102 ${
                        isDarkMode 
                          ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white' 
                          : 'border-neutral-150 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <span>{p}</span> <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message input */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-neutral-800' : 'border-neutral-100'} bg-neutral-950/5`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Aura to update filters..."
                  className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-neutral-950 border border-neutral-800 text-white focus:border-primary' 
                      : 'bg-neutral-50 border border-neutral-150 text-neutral-800 focus:border-neutral-900 focus:bg-white'
                  }`}
                />
                <button
                  type="submit"
                  className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    inputValue.trim() 
                      ? 'bg-primary text-white shadow-md hover:scale-105' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  }`}
                  disabled={!inputValue.trim()}
                  aria-label="Send Message"
                  id="send-chat-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
