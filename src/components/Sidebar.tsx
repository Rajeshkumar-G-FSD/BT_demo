import React from 'react';
import { Home, Search, Grid, MessageSquare, Bell, Settings, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  notificationCount: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  notificationCount
}: SidebarProps) {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-16 z-20 flex flex-col justify-between py-6 select-none">
      
      {/* TOP SECTION: FLOAT FLOATING BUTTONS (HOME, SEARCH, GRID, CHAT) */}
      <div className="flex flex-col items-center gap-3.5 px-2">
        {/* Home Button - Solid White Circle with Dark Icon */}
        <button
          onClick={() => setActiveTab('home')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md ${
            activeTab === 'home'
              ? 'bg-white text-[#1b1451] scale-105 font-bold'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Home"
          id="sidebar-btn-home"
        >
          <Home className="w-4.5 h-4.5 stroke-[2.2]" />
        </button>

        {/* Search Button - Glass Circle */}
        <button
          onClick={() => setActiveTab('search')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'search'
              ? 'bg-white text-[#1b1451]'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Search"
          id="sidebar-btn-search"
        >
          <Search className="w-4.5 h-4.5 stroke-[2.2]" />
        </button>

        {/* Grid/Gallery Button - Glass Circle */}
        <button
          onClick={() => setActiveTab('grid')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'grid'
              ? 'bg-white text-[#1b1451]'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Gallery"
          id="sidebar-btn-grid"
        >
          <Grid className="w-4.5 h-4.5 stroke-[2.2]" />
        </button>

        {/* Chat Button - Glass Circle */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'chat'
              ? 'bg-white text-[#1b1451]'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Aura Chat"
          id="sidebar-btn-chat"
        >
          <MessageSquare className="w-4.5 h-4.5 stroke-[2.2]" />
        </button>
      </div>

      {/* MIDDLE SECTION: SOLID WHITE CAPSULE HANS AVATAR & BELL */}
      <div className="flex flex-col items-center">
        <div className={`w-14 py-4 rounded-r-[2rem] flex flex-col items-center gap-4 shadow-lg border-y border-r transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800/80 text-white' 
            : 'bg-white border-stone-200/60 text-neutral-800'
        }`}>
          {/* Avatar */}
          <div className="relative group w-9 h-9 rounded-full overflow-hidden border border-stone-200/50 cursor-pointer hover:scale-105 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              alt="User avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bell Icon */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative ${
              activeTab === 'notifications'
                ? 'text-amber-500'
                : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
            }`}
            aria-label="Notifications"
            id="sidebar-btn-notifications"
          >
            <Bell className="w-4.5 h-4.5 stroke-[2]" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION: SOLID WHITE CAPSULE HANS SETTINGS & THEME TOGGLES */}
      <div className="flex flex-col items-center">
        <div className={`w-14 pt-4 pb-5 rounded-r-[2rem] flex flex-col items-center gap-4 shadow-lg border-y border-r transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800/80 text-white' 
            : 'bg-white border-stone-200/60 text-neutral-800'
        }`}>
          {/* Settings button */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
              activeTab === 'settings'
                ? 'text-amber-500'
                : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
            }`}
            aria-label="Settings"
            id="sidebar-btn-settings"
          >
            <Settings className="w-4.5 h-4.5 stroke-[2]" />
          </button>

          {/* Theme Toggles (Moon and Sun) */}
          <div className="flex flex-col gap-2.5 items-center">
            {/* Moon Icon */}
            <button
              onClick={() => setIsDarkMode(true)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-850 text-amber-400 shadow-sm scale-110 border border-neutral-700/30' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
              aria-label="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5 stroke-[2]" />
            </button>

            {/* Sun Icon */}
            <button
              onClick={() => setIsDarkMode(false)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                !isDarkMode 
                  ? 'bg-stone-100 text-amber-500 shadow-sm scale-110 border border-stone-200/50' 
                  : 'text-neutral-500 hover:text-white'
              }`}
              aria-label="Light Mode"
            >
              <Sun className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
