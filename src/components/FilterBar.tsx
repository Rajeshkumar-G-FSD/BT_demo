import React, { useState } from 'react';
import { ChevronDown, MapPin, Home, Calendar, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';

interface FilterBarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  isDarkMode: boolean;
}

// Helpers for date parsing & formatting to/from custom string format (e.g., "Jun 28")
const parseDateString = (str?: string) => {
  if (!str) return null;
  const parts = str.trim().split(/\s+/);
  if (parts.length !== 2) return null;
  const monthStr = parts[0];
  const day = parseInt(parts[1], 10);
  const months: Record<string, number> = { 
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 
  };
  const month = months[monthStr];
  if (month === undefined || isNaN(day)) return null;
  return new Date(2026, month, day);
};

const formatDateString = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
};

export default function FilterBar({ filterState, setFilterState, isDarkMode }: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<'Jun' | 'Jul'>('Jun');

  const locations = ['Arizona', 'California', 'Utah', 'Colorado'];
  const propertyTypes = ['Villa', 'Dome', 'Penthouse'];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const selectOption = (type: keyof FilterState, value: any) => {
    setFilterState((prev) => ({
      ...prev,
      [type]: value,
    }));
    setActiveDropdown(null);
  };

  // Renders a high-end customized mini-calendar inside the dropdown
  const renderCalendar = (type: 'checkIn' | 'checkOut') => {
    const isJun = calendarMonth === 'Jun';
    const monthName = isJun ? 'June 2026' : 'July 2026';
    const numDays = isJun ? 30 : 31;
    const emptyCells = isJun ? 1 : 3; // June starts on Mon (1), July starts on Wed (3)
    const monthIndex = isJun ? 5 : 6;

    const days = Array.from({ length: numDays }, (_, i) => i + 1);
    
    const checkInDate = parseDateString(filterState.checkIn);
    const checkOutDate = parseDateString(filterState.checkOut);

    return (
      <div className="p-3 w-64 select-none">
        {/* Month Selector Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCalendarMonth(isJun ? 'Jul' : 'Jun');
            }}
            className="p-1 rounded-lg hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 rotate-90 stroke-[2.5]" />
          </button>
          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100">{monthName}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCalendarMonth(isJun ? 'Jul' : 'Jun');
            }}
            className="p-1 rounded-lg hover:bg-neutral-500/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 -rotate-90 stroke-[2.5]" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
            <span key={wd} className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500">
              {wd}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
          {/* Empty prefix cells */}
          {Array.from({ length: emptyCells }).map((_, i) => (
            <div key={`empty-${i}`} className="w-7 h-7" />
          ))}

          {/* Actual day cells */}
          {days.map((day) => {
            const currentDate = new Date(2026, monthIndex, day);
            const formatted = `${isJun ? 'Jun' : 'Jul'} ${String(day).padStart(2, '0')}`;
            
            const isCheckIn = filterState.checkIn === formatted;
            const isCheckOut = filterState.checkOut === formatted;
            
            let isInRange = false;
            if (checkInDate && checkOutDate) {
              isInRange = currentDate > checkInDate && currentDate < checkOutDate;
            }

            // Disable check-out dates on or before check-in date
            const isDisabled = type === 'checkOut' && checkInDate && currentDate <= checkInDate;

            return (
              <button
                key={day}
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (type === 'checkIn') {
                    setFilterState((prev) => {
                      const newCheckIn = formatted;
                      let newCheckOut = prev.checkOut;
                      const newCI = parseDateString(newCheckIn);
                      const currentCO = parseDateString(prev.checkOut);
                      if (newCI && currentCO && currentCO <= newCI) {
                        const targetCO = new Date(newCI);
                        targetCO.setDate(targetCO.getDate() + 4); // default 4 days checkout duration
                        newCheckOut = formatDateString(targetCO);
                      }
                      return {
                        ...prev,
                        checkIn: newCheckIn,
                        checkOut: newCheckOut,
                      };
                    });
                    // Guide them seamlessly to check-out input
                    setTimeout(() => {
                      setActiveDropdown('checkOut');
                    }, 200);
                  } else {
                    selectOption('checkOut', formatted);
                  }
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isDisabled
                    ? 'text-neutral-300 dark:text-neutral-700 cursor-not-allowed line-through'
                    : isCheckIn || isCheckOut
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm scale-105'
                      : isInRange
                        ? 'bg-amber-400/20 text-amber-500 dark:text-amber-400 font-medium'
                        : 'hover:bg-neutral-500/10 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-between px-6 z-30 select-none h-20 relative">
      
      {/* 1. BUY BUTTON (Floating left side) */}
      <div className="flex items-center">
        <button
          onClick={() => selectOption('offerType', 'Buy')}
          className={`group flex items-center gap-3.5 px-8 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer ${
            filterState.offerType === 'Buy'
              ? isDarkMode
                ? 'bg-neutral-800 text-amber-400 border border-neutral-700/50'
                : 'bg-[#f4f5fa] text-neutral-800 border border-stone-200/50'
              : isDarkMode
                ? 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white'
                : 'bg-white/80 text-neutral-600 border border-white hover:text-neutral-900 hover:bg-white backdrop-blur-sm'
          }`}
          id="toggle-buy-btn"
        >
          <ArrowUpLeft className="w-3.5 h-3.5 stroke-[2] text-amber-500 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Buy</span>
        </button>
      </div>

      {/* 2. CENTRAL FLUID HANGING POD (780px wide to hold Location, Type, Check-in, Check-out) */}
      <div className="relative w-[780px] h-full flex items-center justify-center shrink-0">
        
        {/* Organic Curved Background SVG */}
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-colors duration-500 ${
            isDarkMode ? 'text-neutral-900' : 'text-white'
          }`}
          viewBox="0 0 780 74"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M 0,0 C 15,0 25,74 45,74 L 735,74 C 755,74 765,0 780,0 Z" />
        </svg>
 
        {/* Content of the Hanging Pod */}
        <div className="absolute inset-x-0 bottom-1.5 top-0 flex items-center justify-between px-6 z-10">
          
          {/* Location Selector */}
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={() => toggleDropdown('location')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/5 ${
                activeDropdown === 'location' ? 'bg-neutral-500/5' : ''
              }`}
              id="filter-location-btn"
            >
              <MapPin className="w-4 h-4 text-neutral-400 stroke-[1.8] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 leading-none">
                  Location
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">
                    {filterState.location}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 stroke-[2] transition-transform duration-300 ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'location' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-2 w-44 rounded-2xl p-2 shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => selectOption('location', loc)}
                      className={`flex items-center w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
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
          <div className="h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Property Type Selector */}
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={() => toggleDropdown('propertyType')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/5 ${
                activeDropdown === 'propertyType' ? 'bg-neutral-500/5' : ''
              }`}
              id="filter-type-btn"
            >
              <Home className="w-4 h-4 text-neutral-400 stroke-[1.8] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 leading-none">
                  Property Type
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">
                    {filterState.propertyType}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 stroke-[2] transition-transform duration-300 ${activeDropdown === 'propertyType' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'propertyType' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-2 w-44 rounded-2xl p-2 shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => selectOption('propertyType', type)}
                      className={`flex items-center w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
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
          <div className="h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Check-in Selector */}
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={() => toggleDropdown('checkIn')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/5 ${
                activeDropdown === 'checkIn' ? 'bg-neutral-500/5' : ''
              }`}
              id="filter-checkin-btn"
            >
              <Calendar className="w-4 h-4 text-neutral-400 stroke-[1.8] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 leading-none">
                  Check-in
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 font-mono">
                    {filterState.checkIn || 'Jun 28'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 stroke-[2] transition-transform duration-300 ${activeDropdown === 'checkIn' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'checkIn' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] right-[-40px] rounded-2xl shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {renderCalendar('checkIn')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Check-out Selector */}
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={() => toggleDropdown('checkOut')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 hover:bg-neutral-500/5 ${
                activeDropdown === 'checkOut' ? 'bg-neutral-500/5' : ''
              }`}
              id="filter-checkout-btn"
            >
              <Calendar className="w-4 h-4 text-neutral-400 stroke-[1.8] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 leading-none">
                  Check-out
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 font-mono">
                    {filterState.checkOut || 'Jul 05'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 stroke-[2] transition-transform duration-300 ${activeDropdown === 'checkOut' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'checkOut' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] right-[-20px] rounded-2xl shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {renderCalendar('checkOut')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* 3. RENT BUTTON (Floating right side) */}
      <div className="flex items-center">
        <button
          onClick={() => selectOption('offerType', 'Rent')}
          className={`group flex items-center gap-3.5 px-8 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer ${
            filterState.offerType === 'Rent'
              ? isDarkMode
                ? 'bg-neutral-800 text-amber-400 border border-neutral-700/50'
                : 'bg-[#f4f5fa] text-[#1b1451] border border-stone-200/50'
              : isDarkMode
                ? 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white'
                : 'bg-white/80 text-neutral-600 border border-white hover:text-[#1b1451] hover:bg-white backdrop-blur-sm'
          }`}
          id="toggle-rent-btn"
        >
          <span className="text-xs uppercase tracking-wider font-semibold">Rent</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2] text-amber-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

    </div>
  );
}
