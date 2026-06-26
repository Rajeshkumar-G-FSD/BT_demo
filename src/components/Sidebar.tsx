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
    <div className="w-full h-full md:absolute md:left-0 md:top-0 md:bottom-0 md:w-16 z-20 flex flex-row md:flex-col justify-between items-center px-4 md:px-0 py-2 md:py-6 select-none bg-neutral-900/60 md:bg-transparent border border-white/5 md:border-none backdrop-blur-md md:backdrop-blur-none rounded-3xl md:rounded-none shadow-xl md:shadow-none">
      
      {/* TOP SECTION: FLOAT FLOATING BUTTONS (HOME, SEARCH, GRID, CHAT) */}
      <div className="flex flex-row md:flex-col items-center gap-2 md:gap-3.5">
        {/* Home Button */}
        <button
          onClick={() => setActiveTab('home')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md ${
            activeTab === 'home'
              ? 'bg-white text-primary scale-105 font-bold'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Home"
          id="sidebar-btn-home"
        >
          <Home className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>

        {/* Search Button */}
        <button
          onClick={() => setActiveTab('search')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'search'
              ? 'bg-white text-primary'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Search"
          id="sidebar-btn-search"
        >
          <Search className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>

        {/* Grid/Gallery Button */}
        <button
          onClick={() => setActiveTab('grid')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'grid'
              ? 'bg-white text-primary'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Gallery"
          id="sidebar-btn-grid"
        >
          <Grid className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>

        {/* Chat Button */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'chat'
              ? 'bg-white text-primary'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Aura Chat"
          id="sidebar-btn-chat"
        >
          <MessageSquare className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>
      </div>

      {/* MIDDLE SECTION: SOLID AVATAR & BELL */}
      <div className="flex flex-row md:flex-col items-center">
        <div className={`flex flex-row md:flex-col items-center gap-2.5 md:gap-4 p-1 md:p-0 md:w-14 md:py-4 rounded-full md:rounded-l-none md:rounded-r-[2rem] shadow-md md:shadow-lg border border-white/10 md:border-y md:border-r transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-neutral-950/65 md:bg-neutral-900 border-neutral-800/80 text-white' 
            : 'bg-white/85 md:bg-white border-stone-200/60 text-neutral-800'
        }`}>
          {/* Avatar */}
          <div className="relative group w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden border border-stone-200/50 cursor-pointer hover:scale-105 transition-all duration-300">
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
            className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative ${
              activeTab === 'notifications'
                ? 'text-primary'
                : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
            }`}
            aria-label="Notifications"
            id="sidebar-btn-notifications"
          >
            <Bell className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2]" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-primary"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION: SETTINGS & THEME TOGGLES */}
      <div className="flex flex-row md:flex-col items-center">
        <div className={`flex flex-row md:flex-col items-center gap-2.5 md:gap-4 p-1 md:p-0 md:w-14 md:pt-4 md:pb-5 rounded-full md:rounded-l-none md:rounded-r-[2rem] shadow-md md:shadow-lg border border-white/10 md:border-y md:border-r transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-neutral-950/65 md:bg-neutral-900 border-neutral-800/80 text-white' 
            : 'bg-white/85 md:bg-white border-stone-200/60 text-neutral-800'
        }`}>
          {/* Settings button */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
              activeTab === 'settings'
                ? 'text-primary'
                : 'text-neutral-400 hover:text-neutral-800 dark:hover:text-white'
            }`}
            aria-label="Settings"
            id="sidebar-btn-settings"
          >
            <Settings className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2]" />
          </button>

          {/* Theme Toggles (Moon and Sun) */}
          <div className="flex flex-row md:flex-col gap-1.5 md:gap-2.5 items-center">
            {/* Moon Icon */}
            <button
              onClick={() => setIsDarkMode(true)}
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-805 text-primary shadow-sm scale-110 border border-neutral-700/30' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
              aria-label="Dark Mode"
            >
              <Moon className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2]" />
            </button>

            {/* Sun Icon */}
            <button
              onClick={() => setIsDarkMode(false)}
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                !isDarkMode 
                  ? 'bg-stone-100 text-primary shadow-sm scale-110 border border-stone-200/50' 
                  : 'text-neutral-500 hover:text-white'
              }`}
              aria-label="Light Mode"
            >
              <Sun className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
