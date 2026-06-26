import React from 'react';
import { Home, Info, Image, Briefcase, Bell, Facebook, Instagram, Youtube } from 'lucide-react';
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
    <div className="w-full h-full md:absolute md:left-0 md:top-0 md:bottom-0 md:w-16 z-20 flex flex-row md:flex-col justify-between items-center px-4 md:px-0 py-2 md:py-6 select-none bg-neutral-900/60 md:bg-transparent border border-white/5 md:border-none backdrop-blur-md md:backdrop-blur-none rounded-3xl md:rounded-none shadow-xl md:shadow-none overflow-x-auto md:overflow-x-visible md:overflow-y-visible flex-nowrap gap-4 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* TOP SECTION: FLOAT FLOATING BUTTONS (HOME, SEARCH, GRID, CHAT) */}
      <div className="flex flex-row md:flex-col items-center gap-2 md:gap-3.5 shrink-0">
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

        {/* About Us Button */}
        <button
          onClick={() => setActiveTab('about')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'about'
              ? 'bg-white text-primary font-bold scale-105'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="About Us"
          title="About Us"
          id="sidebar-btn-about"
        >
          <Info className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>

        {/* Gallery Button */}
        <button
          onClick={() => setActiveTab('grid')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'grid' || activeTab === 'gallery'
              ? 'bg-white text-primary font-bold scale-105'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Gallery"
          title="Gallery"
          id="sidebar-btn-grid"
        >
          <Image className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>

        {/* Careers Button */}
        <button
          onClick={() => setActiveTab('careers')}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
            activeTab === 'careers'
              ? 'bg-white text-primary font-bold scale-105'
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 backdrop-blur-md'
          }`}
          aria-label="Careers"
          title="Careers"
          id="sidebar-btn-careers"
        >
          <Briefcase className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2.2]" />
        </button>
      </div>

      {/* MIDDLE SECTION: SOLID AVATAR & BELL */}
      <div className="flex flex-row md:flex-col items-center shrink-0">
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

      {/* BOTTOM SECTION: SOCIAL LINKS (FACEBOOK, INSTAGRAM, YOUTUBE) */}
      <div className="flex flex-row md:flex-col items-center shrink-0">
        <div className={`flex flex-row md:flex-col items-center gap-3 md:gap-4 p-2 md:p-0 md:w-14 md:py-4.5 rounded-full md:rounded-l-none md:rounded-r-[2rem] shadow-md md:shadow-lg border border-white/10 md:border-y md:border-r transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-neutral-950/65 md:bg-neutral-900 border-neutral-800/80 text-white' 
            : 'bg-white/85 md:bg-white border-stone-200/60 text-neutral-800'
        }`}>
          {/* Facebook Link */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Facebook"
            id="sidebar-social-facebook"
          >
            <Facebook className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2]" />
          </a>

          {/* Instagram Link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Instagram"
            id="sidebar-social-instagram"
          >
            <Instagram className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2]" />
          </a>

          {/* YouTube Link */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="YouTube"
            id="sidebar-social-youtube"
          >
            <Youtube className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[2]" />
          </a>
        </div>
      </div>

    </div>
  );
}
