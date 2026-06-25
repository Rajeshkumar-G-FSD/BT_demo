import React, { useState } from 'react';
import { ChevronDown, MapPin, Home, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';

interface FilterBarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  isDarkMode: boolean;
}

export default function FilterBar({ filterState, setFilterState, isDarkMode }: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const locations = ['Arizona', 'California', 'Utah', 'Colorado'];
  const propertyTypes = ['Villa', 'Dome', 'Penthouse'];
  const maxPrices = [300000, 500000, 1000000, 2000000];

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const selectOption = (type: keyof FilterState, value: any) => {
    setFilterState((prev) => ({
      ...prev,
      [type]: value,
    }));
    setActiveDropdown(null);
  };

  const formatPrice = (price: number) => {
    return '$' + price.toLocaleString();
  };

  return (
    <div className="relative flex items-center justify-between w-full max-w-5xl px-6 py-2.5 rounded-[2.5rem] transition-all duration-500 z-30">
      
      {/* BUY Toggle Button - Left Side */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => selectOption('offerType', 'Buy')}
          className={`relative px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 overflow-hidden cursor-pointer flex items-center gap-1.5 ${
            filterState.offerType === 'Buy'
              ? isDarkMode
                ? 'bg-amber-400 text-neutral-900 font-semibold shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:scale-105'
                : 'bg-neutral-900 text-white font-semibold shadow-md hover:scale-105'
              : isDarkMode
                ? 'bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 shadow-sm border border-neutral-100'
          }`}
          id="toggle-buy-btn"
        >
          <span className="text-xs">↗</span> Buy
        </button>
      </div>

      {/* FLOATING MIDDLE SEARCH ISLAND */}
      <div className={`flex items-center gap-1 px-5 py-2 rounded-[2rem] transition-all duration-500 ${
        isDarkMode 
          ? 'bg-neutral-900/80 border border-neutral-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-white border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
      } backdrop-blur-lg`}>
        
        {/* Location Selector */}
        <div className="relative flex items-center">
          <button
            onClick={() => toggleDropdown('location')}
            className={`flex flex-col items-start px-5 py-1.5 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/10 ${
              activeDropdown === 'location' ? 'bg-neutral-500/10' : ''
            }`}
            id="filter-location-btn"
          >
            <div className="flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
              <MapPin className="w-3 h-3 text-amber-500" /> Location
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-neutral-800 dark:text-white">
                {filterState.location}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'location' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`absolute top-[4.5rem] left-0 w-44 rounded-2xl p-2.5 shadow-2xl z-50 border ${
                  isDarkMode ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-100 text-neutral-800'
                }`}
              >
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => selectOption('location', loc)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      filterState.location === loc
                        ? 'bg-amber-400/15 text-amber-500 dark:text-amber-400'
                        : 'hover:bg-neutral-500/10'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-2" />

        {/* Property Type Selector */}
        <div className="relative flex items-center">
          <button
            onClick={() => toggleDropdown('propertyType')}
            className={`flex flex-col items-start px-5 py-1.5 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/10 ${
              activeDropdown === 'propertyType' ? 'bg-neutral-500/10' : ''
            }`}
            id="filter-type-btn"
          >
            <div className="flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
              <Home className="w-3 h-3 text-amber-500" /> Property Type
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-neutral-800 dark:text-white">
                {filterState.propertyType}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${activeDropdown === 'propertyType' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence>
            {activeDropdown === 'propertyType' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`absolute top-[4.5rem] left-0 w-44 rounded-2xl p-2.5 shadow-2xl z-50 border ${
                  isDarkMode ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-100 text-neutral-800'
                }`}
              >
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => selectOption('propertyType', type)}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      filterState.propertyType === type
                        ? 'bg-amber-400/15 text-amber-500 dark:text-amber-400'
                        : 'hover:bg-neutral-500/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-2" />

        {/* Max Price Selector */}
        <div className="relative flex items-center">
          <button
            onClick={() => toggleDropdown('maxPrice')}
            className={`flex flex-col items-start px-5 py-1.5 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/10 ${
              activeDropdown === 'maxPrice' ? 'bg-neutral-500/10' : ''
            }`}
            id="filter-price-btn"
          >
            <div className="flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
              <DollarSign className="w-3 h-3 text-amber-500" /> Max Price
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-neutral-800 dark:text-white font-mono">
                {formatPrice(filterState.maxPrice)}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${activeDropdown === 'maxPrice' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence>
            {activeDropdown === 'maxPrice' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`absolute top-[4.5rem] right-0 w-48 rounded-2xl p-2.5 shadow-2xl z-50 border ${
                  isDarkMode ? 'bg-neutral-950 border-neutral-850 text-white' : 'bg-white border-neutral-100 text-neutral-800'
                }`}
              >
                {maxPrices.map((price) => (
                  <button
                    key={price}
                    onClick={() => selectOption('maxPrice', price)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      filterState.maxPrice === price
                        ? 'bg-amber-400/15 text-amber-500 dark:text-amber-400'
                        : 'hover:bg-neutral-500/10'
                    }`}
                  >
                    <span className="font-mono">{formatPrice(price)}</span>
                    {filterState.maxPrice === price && <span className="text-[10px] font-semibold text-amber-500">Active</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* RENT Toggle Button - Right Side */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => selectOption('offerType', 'Rent')}
          className={`relative px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 overflow-hidden cursor-pointer flex items-center gap-1.5 ${
            filterState.offerType === 'Rent'
              ? isDarkMode
                ? 'bg-amber-400 text-neutral-900 font-semibold shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:scale-105'
                : 'bg-neutral-900 text-white font-semibold shadow-md hover:scale-105'
              : isDarkMode
                ? 'bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 shadow-sm border border-neutral-100'
          }`}
          id="toggle-rent-btn"
        >
          Rent <span className="text-xs">↗</span>
        </button>
      </div>

    </div>
  );
}
