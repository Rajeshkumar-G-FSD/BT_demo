import React, { useState } from 'react';
import { ChevronDown, MapPin, Home, Calendar, ArrowUpRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';
import logoImg from '../assets/images/BrownTree_logo.png';
import adminLogoImg from '../assets/images/Browntree_Admin_logo.png';

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

  const locations = ['OOTY', 'COONOOR', 'KOTHAKIRI', 'KODAIKANAL'];
  const propertyTypes = ['Hotel', 'HomeStays', 'Heritage Stays', 'Service Apartments'];

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
                      ? 'bg-primary text-white font-bold shadow-sm scale-105'
                      : isInRange
                        ? 'bg-primary/20 text-primary dark:text-primary font-medium'
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
    <div className="w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-6 z-30 select-none h-auto lg:h-20 gap-4 lg:gap-0 pt-4 lg:pt-0 pb-3 lg:pb-0 relative">
      
      {/* 1. LOGO & MOBILE RE-TREATS (Floating left side on desktop, full row on mobile) */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-4">
        <div
          className="group flex items-center justify-center p-0 select-none border-none bg-transparent"
          title="BT Premium Estates"
          id="logo-display"
        >
          <img 
            src={logoImg} 
            alt="BT Logo" 
            className="h-14 lg:h-18 w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>


      </div>

      {/* 2. CENTRAL FLUID HANGING POD (780px wide on desktop, elegant responsive glassmorphic stack on mobile) */}
      <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-0 w-full lg:w-[780px] h-auto lg:h-full flex items-center justify-center shrink-0 lg:shrink">
        
        {/* Organic Curved Background SVG - only on desktop */}
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-colors duration-500 hidden lg:block ${
            isDarkMode ? 'text-neutral-900' : 'text-white'
          }`}
          viewBox="0 0 780 74"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M 0,0 C 15,0 25,74 45,74 L 735,74 C 755,74 765,0 780,0 Z" />
        </svg>
 
        {/* Content of the Hanging Pod */}
        <div className={`w-full lg:absolute lg:inset-x-0 lg:bottom-1.5 lg:top-0 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-0 px-4 lg:px-6 py-4 lg:py-0 z-10 rounded-2xl lg:rounded-none transition-all duration-300 ${
          isDarkMode 
            ? 'bg-neutral-900/50 border border-neutral-800/80 lg:bg-transparent lg:border-none' 
            : 'bg-white/80 border border-stone-200/50 lg:bg-transparent lg:border-none'
        } backdrop-blur-md lg:backdrop-blur-none`}>
          
          {/* Location Selector */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            <button
              onClick={() => toggleDropdown('location')}
              className={`flex items-center justify-between lg:justify-center gap-2.5 px-3.5 py-2.5 lg:py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 w-full ${
                activeDropdown === 'location' 
                  ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/25' 
                  : 'hover:bg-neutral-500/5'
              }`}
              id="filter-location-btn"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 stroke-[2] shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-neutral-400 dark:text-neutral-500">
                    Location
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-extrabold text-primary dark:text-primary">
                      {filterState.location}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 text-primary ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'location' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-0 right-0 lg:right-auto lg:left-2 lg:w-44 rounded-2xl p-2 shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {locations.map((loc) => {
                    const isSelected = filterState.location === loc;
                    return (
                      <button
                        key={loc}
                        onClick={() => selectOption('location', loc)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-white shadow-md'
                            : 'hover:bg-neutral-500/10 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span>{loc}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Property Type Selector */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            <button
              onClick={() => toggleDropdown('propertyType')}
              className={`flex items-center justify-between lg:justify-center gap-2.5 px-3.5 py-2.5 lg:py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 w-full ${
                activeDropdown === 'propertyType' 
                  ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/25' 
                  : 'hover:bg-neutral-500/5'
              }`}
              id="filter-type-btn"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 stroke-[2] shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-neutral-400 dark:text-neutral-500">
                    Property Type
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-extrabold text-primary dark:text-primary">
                      {filterState.propertyType}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 text-primary ${activeDropdown === 'propertyType' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'propertyType' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-0 right-0 lg:right-auto lg:left-2 lg:w-44 rounded-2xl p-2 shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {propertyTypes.map((type) => {
                    const isSelected = filterState.propertyType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => selectOption('propertyType', type)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-white shadow-md'
                            : 'hover:bg-neutral-500/10 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span>{type}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Check-in Selector */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            <button
              onClick={() => toggleDropdown('checkIn')}
              className={`flex items-center justify-between lg:justify-center gap-2.5 px-3.5 py-2.5 lg:py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 w-full ${
                activeDropdown === 'checkIn' 
                  ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/25' 
                  : 'hover:bg-neutral-500/5'
              }`}
              id="filter-checkin-btn"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 stroke-[2] shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-neutral-400 dark:text-neutral-500">
                    Check-in
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-extrabold text-primary dark:text-primary font-mono">
                      {filterState.checkIn || 'Jun 28'}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 text-primary ${activeDropdown === 'checkIn' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'checkIn' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-0 right-0 lg:left-auto lg:right-[-40px] rounded-2xl shadow-2xl z-50 border ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-100 text-neutral-800'
                  }`}
                >
                  {renderCalendar('checkIn')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-6 w-[1px] bg-neutral-200/60 dark:bg-neutral-800/60" />

          {/* Check-out Selector */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            <button
              onClick={() => toggleDropdown('checkOut')}
              className={`flex items-center justify-between lg:justify-center gap-2.5 px-3.5 py-2.5 lg:py-1.5 rounded-xl text-left cursor-pointer transition-all duration-300 w-full ${
                activeDropdown === 'checkOut' 
                  ? 'bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/25' 
                  : 'hover:bg-neutral-500/5'
              }`}
              id="filter-checkout-btn"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 stroke-[2] shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-neutral-400 dark:text-neutral-500">
                    Check-out
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-extrabold text-primary dark:text-primary font-mono">
                      {filterState.checkOut || 'Jul 05'}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 text-primary ${activeDropdown === 'checkOut' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'checkOut' && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`absolute top-[4.25rem] left-0 right-0 lg:left-auto lg:right-[-20px] rounded-2xl shadow-2xl z-50 border ${
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



    </div>
  );
}
