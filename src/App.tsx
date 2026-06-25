import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Bookmark, 
  Share2, 
  Maximize2, 
  ArrowUpRight, 
  Grid as GridIcon, 
  MapPin, 
  Check, 
  Sparkles,
  Info,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';
import { PROPERTIES } from './data';
import { FilterState, Property } from './types';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import AuraChat from './components/AuraChat';

export default function App() {
  // State variables
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    location: 'Arizona',
    propertyType: 'Villa',
    maxPrice: 500000,
    offerType: 'Buy'
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Property state
  const [selectedProperty, setSelectedProperty] = useState<Property>(PROPERTIES[0]);
  const [activeBgImage, setActiveBgImage] = useState(PROPERTIES[0].mainImage);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  
  // Interaction states
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(4420);
  const [bookmarkCount, setBookmarkCount] = useState(157);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPropertyGrid, setShowPropertyGrid] = useState(false);
  const [tourMode, setTourMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  // Sync active property when filters change
  useEffect(() => {
    const matched = PROPERTIES.find(
      (p) => 
        p.location === filterState.location && 
        p.type === filterState.propertyType &&
        (filterState.offerType === 'Buy' ? p.price <= filterState.maxPrice : p.rentPrice * 100 <= filterState.maxPrice)
    );
    
    if (matched) {
      setSelectedProperty(matched);
      setActiveBgImage(matched.mainImage);
      setActiveRoomIndex(0);
    }
  }, [filterState]);

  // Open Chat when 'chat' tab is selected
  useEffect(() => {
    if (activeTab === 'chat') {
      setIsChatOpen(true);
      setActiveTab('home'); // revert sidebar active button to home, keep chat open
    }
  }, [activeTab]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);
  };

  const selectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveBgImage(property.mainImage);
    setActiveRoomIndex(0);
    setFilterState(prev => ({
      ...prev,
      location: property.location,
      propertyType: property.type,
    }));
    setShowPropertyGrid(false);
  };

  // Preset hotspots for immersive 3D touring of our signature Lunar Oasis Villa!
  const hotspots = [
    { id: 1, name: 'Exterior Lounge', top: '78%', left: '35%', index: 0 },
    { id: 2, name: 'Living Lounge', top: '68%', left: '50%', index: 1 },
    { id: 3, name: 'Infinity Pool', top: '80%', left: '60%', index: 2 },
    { id: 4, name: 'Master Suite', top: '48%', left: '74%', index: 3 },
  ];

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 lg:p-8 transition-colors duration-700 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-stone-100 text-neutral-800'} overflow-x-hidden font-sans`}>
      
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 dark:bg-amber-400/2 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-400/2 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* DASHBOARD OUTER SHELL FRAME (Replicates elegant curve cutouts and structural layout) */}
      <div className={`relative w-full max-w-6xl aspect-auto lg:aspect-[4/3] rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.25)] border ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-stone-200'} flex overflow-hidden z-10 min-h-[580px]`}>
        
        {/* SIDEBAR COMPONENT (Left Side) */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            if (tab === 'grid') {
              setShowPropertyGrid(true);
            } else if (tab === 'home') {
              setShowPropertyGrid(false);
              setTourMode(false);
              setActiveTab('home');
            } else {
              setActiveTab(tab);
            }
          }}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          notificationCount={notificationCount}
        />

        {/* MAIN VIEWPORT PANEL (Right Side - contains sky hero images, text, and floating islands) */}
        <div className="flex-1 relative flex flex-col justify-between overflow-hidden">
          
          {/* IMMERSIVE BACKGROUND TRANSITIONS */}
          <div className="absolute inset-0 z-0 select-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeBgImage}
                src={activeBgImage}
                alt={selectedProperty.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            {/* Soft Overlay Gradients to keep text highly legible under any sun lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/45 z-10 pointer-events-none" />
          </div>

          {/* TOP BAR / FILTER BAR */}
          <div className="w-full px-8 pt-6 z-20 flex justify-center">
            <FilterBar 
              filterState={filterState} 
              setFilterState={setFilterState} 
              isDarkMode={isDarkMode} 
            />
          </div>

          {/* DYNAMIC BACKGOUND TOUR HOTSPOTS (Only displays for Lunar Oasis Villa to show 3D feature!) */}
          {selectedProperty.id === 'lunar-oasis' && !isChatOpen && (
            <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
              {hotspots.map((h) => {
                const isSelected = activeRoomIndex === h.index;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActiveRoomIndex(h.index);
                      setActiveBgImage(selectedProperty.gallery[h.index].url);
                    }}
                    style={{ top: h.top, left: h.left }}
                    className="absolute pointer-events-auto group flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    id={`hotspot-${h.id}`}
                  >
                    <span className="relative flex h-6 w-6">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSelected ? 'bg-amber-400' : 'bg-white'}`}></span>
                      <span className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center border-2 border-white shadow-md ${isSelected ? 'bg-amber-400 text-neutral-900' : 'bg-black/40 text-white'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </span>
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-neutral-900/90 text-white text-[10px] font-semibold px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg whitespace-nowrap">
                      {h.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* HERO CENTER TEXT AREA */}
          <div className="flex-1 flex flex-col justify-center px-12 md:px-16 pt-12 md:pt-4 z-10 max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4 cursor-pointer hover:bg-white/20 transition-all duration-300">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] font-semibold tracking-wider uppercase">Elite Luxury Portfolio</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight leading-[1.05] drop-shadow-sm">
                New Way Of <br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-white">Living</span>
              </h1>
              
              <p className="mt-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-light drop-shadow-md">
                Discover extraordinary properties available for purchase or rent. Whether you’re seeking a dream home or a unique investment, our curated listings offer the most exceptional estates worldwide.
              </p>
            </motion.div>
          </div>

          {/* BOTTOM ISLANDS CONTAINER (Find Perfect Place & Glass spec card) */}
          <div className="w-full px-8 pb-8 z-20 flex flex-col md:flex-row items-stretch justify-between gap-6">
            
            {/* BOTTOM-LEFT CARD: Find The Perfect Place (Merged visually with the corners) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`w-full md:w-[42%] p-6 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 border ${
                isDarkMode 
                  ? 'bg-neutral-900/90 border-neutral-800 text-white' 
                  : 'bg-white border-stone-100 text-neutral-800 shadow-[0_15px_35px_rgba(0,0,0,0.08)]'
              }`}
            >
              <div>
                <h2 className="text-sm font-semibold tracking-tight uppercase font-display text-amber-500 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Find The Perfect Place
                </h2>
                <p className={`mt-2 text-[11px] leading-relaxed font-normal ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Our platform connects you with extraordinary homes in the most sought-after locations. Start your journey to discovering the perfect match for your lifestyle.
                </p>
              </div>

              {/* PROPERTIES MOCK LIST SLIDE IN OVERLAY */}
              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold font-display tracking-tight text-neutral-900 dark:text-white">
                    10K+
                  </div>
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400">
                    Active Listings
                  </div>
                </div>

                {/* Staggered circular avatars of properties */}
                <div className="flex items-center -space-x-3 cursor-pointer group" onClick={() => setShowPropertyGrid(true)}>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm group-hover:-translate-x-1 transition-transform duration-300">
                    <img src={PROPERTIES[0].mainImage} alt="Villa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-300">
                    <img src={PROPERTIES[1].mainImage} alt="Dome" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                    <img src={PROPERTIES[2].mainImage} alt="Penthouse" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  {/* Plus Icon trigger */}
                  <button 
                    className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-amber-400 text-white dark:text-neutral-900 flex items-center justify-center text-xs font-semibold shadow-md border-2 border-white dark:border-neutral-900 cursor-pointer"
                    id="expand-grid-btn"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM-RIGHT GLASS CARD: Property Detail Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full md:w-[54%] p-6 rounded-[2.5rem] glassmorphic bg-white/10 dark:bg-neutral-950/20 border border-white/20 dark:border-white/5 text-white flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              {/* Card top details */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight text-white flex items-center gap-2">
                    {selectedProperty.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>{selectedProperty.address}</span>
                  </div>
                </div>

                {/* Floating Round Detail Spec Trigger */}
                <button 
                  onClick={() => setTourMode(!tourMode)}
                  className="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                  title="Tour Inside"
                  id="tour-mode-btn"
                >
                  <Maximize2 className="w-4 h-4 text-neutral-800" />
                </button>
              </div>

              {/* Sub description inside glass */}
              <p className="mt-3.5 text-[11px] leading-relaxed text-neutral-300 font-light line-clamp-2">
                {selectedProperty.description}
              </p>

              {/* Spec indicators with premium styling */}
              <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-mono font-medium">{selectedProperty.size}m²</span>
                  <span className="text-neutral-400 text-[10px]">Interior</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-mono font-medium">{selectedProperty.yard}m²</span>
                  <span className="text-neutral-400 text-[10px]">Yard</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-medium">{selectedProperty.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="font-medium">{selectedProperty.baths} Bathrooms</span>
                </div>
              </div>

              {/* Glass Card footer actions */}
              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                {/* Price Label */}
                <div>
                  <div className="text-[9px] uppercase font-semibold tracking-wider text-neutral-300">
                    Est. Value
                  </div>
                  <div className="text-xl font-semibold font-display tracking-tight text-white font-mono">
                    {filterState.offerType === 'Buy' 
                      ? '$' + selectedProperty.price.toLocaleString()
                      : '$' + selectedProperty.rentPrice.toLocaleString() + '/mo'
                    }
                  </div>
                </div>

                {/* Interaction buttons group */}
                <div className="flex items-center gap-2">
                  {/* Like button */}
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      isLiked 
                        ? 'bg-rose-500 border-rose-500 text-white scale-105' 
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5 text-neutral-200'
                    }`}
                    id="like-property-btn"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-mono">{likeCount}</span>
                  </button>

                  {/* Bookmark button */}
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isBookmarked 
                        ? 'bg-amber-400 border-amber-400 text-neutral-900 scale-105' 
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5 text-neutral-200'
                    }`}
                    id="bookmark-property-btn"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Share button */}
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="p-2 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-neutral-200 transition-all duration-300 cursor-pointer"
                    id="share-property-btn"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>

          </div>

          {/* TOUR INTERIOR CONTROLS DRAWER (Only activates when clicking Tour button) */}
          <AnimatePresence>
            {tourMode && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 h-44 bg-neutral-950/95 text-white backdrop-blur-xl z-30 p-6 flex flex-col justify-between border-t border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-sm tracking-wide text-amber-400 uppercase flex items-center gap-1.5">
                      <Layers className="w-4 h-4 animate-spin-slow" /> Immersive Virtual Tour
                    </h4>
                    <p className="text-neutral-400 text-[10px] mt-0.5">Explore the customized architectural living spaces of {selectedProperty.name}.</p>
                  </div>
                  <button
                    onClick={() => setTourMode(false)}
                    className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  >
                    Exit Tour
                  </button>
                </div>

                {/* Gallery room options */}
                <div className="flex gap-4 overflow-x-auto pb-2 mt-4">
                  {selectedProperty.gallery.map((g, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveRoomIndex(idx);
                        setActiveBgImage(g.url);
                      }}
                      className={`relative flex-none w-32 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        activeRoomIndex === idx ? 'border-amber-400 scale-102 shadow-lg' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                      id={`tour-room-btn-${idx}`}
                    >
                      <img src={g.url} alt={g.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-center">
                        <span className="text-[9px] font-semibold text-white tracking-wide">{g.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ALL PROPERTIES GRID OVERLAY DRAWER */}
          <AnimatePresence>
            {showPropertyGrid && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xl z-40 p-8 flex flex-col overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                      <GridIcon className="w-5 h-5 text-amber-400" /> Curated Property Portfolio
                    </h3>
                    <p className="text-neutral-400 text-xs mt-1">Explore our masterpiece architectural estates for sale and lease.</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowPropertyGrid(false);
                      setActiveTab('home');
                    }}
                    className="text-xs text-neutral-400 hover:text-white px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  >
                    Close Portfolio
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full flex-1">
                  {PROPERTIES.map((p) => {
                    const isCurrent = selectedProperty.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => selectProperty(p)}
                        className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 relative flex flex-col h-64 ${
                          isCurrent 
                            ? 'border-amber-400 bg-neutral-900/50 shadow-[0_0_20px_rgba(251,191,36,0.25)]' 
                            : 'border-white/10 bg-neutral-900/20 hover:border-white/30 hover:bg-neutral-900/40'
                        }`}
                        id={`portfolio-item-${p.id}`}
                      >
                        {/* Property Image Thumbnail */}
                        <div className="w-full h-36 overflow-hidden relative">
                          <img 
                            src={p.mainImage} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-neutral-950/70 text-[9px] font-semibold tracking-wider uppercase text-amber-400 backdrop-blur-sm border border-white/10">
                            {p.type}
                          </div>
                          {isCurrent && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-neutral-900 text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" /> Selected
                            </div>
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display font-semibold text-sm text-white group-hover:text-amber-400 transition-colors duration-300">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-400">
                              <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                              <span>{p.address}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                            <span className="font-mono text-sm font-semibold text-white">
                              {filterState.offerType === 'Buy' 
                                ? '$' + p.price.toLocaleString()
                                : '$' + p.rentPrice.toLocaleString() + '/mo'
                              }
                            </span>
                            <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                              <span>Details</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CHAT DRAWER OVERLAY PANEL */}
          <AuraChat 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
            filterState={filterState} 
            setFilterState={setFilterState} 
            isDarkMode={isDarkMode} 
          />

          {/* SHARE INTERACTIVE MODAL */}
          <AnimatePresence>
            {showShareModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className={`max-w-sm w-full p-6 rounded-3xl border shadow-2xl ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-center">Share This Masterpiece</h3>
                  <p className="text-neutral-400 text-xs text-center mt-1">Send this architectural escape to your companions.</p>

                  <div className="mt-5 space-y-2.5">
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="w-full py-2.5 rounded-xl bg-neutral-950 dark:bg-amber-400 text-white dark:text-neutral-900 text-xs font-semibold cursor-pointer transition-all duration-300 hover:opacity-90"
                    >
                      Copy Exclusive Link
                    </button>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-all duration-300"
                    >
                      Share via Email
                    </button>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="w-full py-2.5 rounded-xl text-neutral-400 text-xs font-medium cursor-pointer transition-all hover:text-neutral-200"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
