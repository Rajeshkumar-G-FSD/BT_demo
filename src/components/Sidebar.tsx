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
  const mainNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'grid', icon: Grid, label: 'Gallery' },
    { id: 'chat', icon: MessageSquare, label: 'Aura Chat' },
  ];

  return (
    <div className={`relative flex flex-col justify-between items-center h-full w-20 py-8 z-20 transition-colors duration-500 ${isDarkMode ? 'bg-neutral-900/90 text-white' : 'bg-white/90 text-neutral-800'} backdrop-blur-md border-r ${isDarkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
      
      {/* Top section: Main Navigation */}
      <div className="flex flex-col gap-6 items-center w-full">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group relative flex justify-center items-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label={item.label}
              id={`sidebar-btn-${item.id}`}
            >
              {/* Highlight Background on Active */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBg"
                  className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,0.3)]' : 'bg-neutral-100 shadow-sm'}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon
                className={`w-5 h-5 transition-all duration-300 z-10 ${
                  isActive
                    ? isDarkMode ? 'text-amber-400 scale-110' : 'text-neutral-900 scale-110 font-semibold'
                    : isDarkMode ? 'text-neutral-500 group-hover:text-neutral-200' : 'text-neutral-400 group-hover:text-neutral-800'
                }`}
              />
              
              {/* Custom Tooltip */}
              <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-neutral-950 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg font-medium z-30 pointer-events-none">
                {item.label}
              </div>
            </button>
          );
        })}
        
        {/* User Profile Avatar with custom curve detail */}
        <div className="relative group w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-amber-200 cursor-pointer hover:scale-105 transition-all duration-300">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
            alt="User avatar"
            className="w-full h-full rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-neutral-950 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg font-medium z-30 pointer-events-none">
            Member Elite
          </div>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveTab('notifications')}
          className="group relative flex justify-center items-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Notifications"
          id="sidebar-btn-notifications"
        >
          {activeTab === 'notifications' && (
            <motion.div
              layoutId="activeNavBg"
              className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-amber-400/20' : 'bg-neutral-100'}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <Bell
            className={`w-5 h-5 transition-all duration-300 z-10 ${
              activeTab === 'notifications'
                ? isDarkMode ? 'text-amber-400' : 'text-neutral-900'
                : isDarkMode ? 'text-neutral-500 group-hover:text-neutral-200' : 'text-neutral-400 group-hover:text-neutral-800'
            }`}
          />
          {notificationCount > 0 && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
          <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-neutral-950 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg font-medium z-30 pointer-events-none">
            Notifications
          </div>
        </button>
      </div>

      {/* Bottom section: Theme & Settings */}
      <div className="flex flex-col gap-5 items-center w-full">
        {/* Settings button */}
        <button
          onClick={() => setActiveTab('settings')}
          className="group relative flex justify-center items-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          aria-label="Settings"
          id="sidebar-btn-settings"
        >
          {activeTab === 'settings' && (
            <motion.div
              layoutId="activeNavBg"
              className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-amber-400/20' : 'bg-neutral-100'}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <Settings
            className={`w-5 h-5 transition-all duration-300 z-10 ${
              activeTab === 'settings'
                ? isDarkMode ? 'text-amber-400' : 'text-neutral-900'
                : isDarkMode ? 'text-neutral-500 group-hover:text-neutral-200' : 'text-neutral-400 group-hover:text-neutral-800'
            }`}
          />
          <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-neutral-950 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg font-medium z-30 pointer-events-none">
            Settings
          </div>
        </button>

        {/* Interactive Mode Toggle */}
        <div className={`relative flex flex-col gap-1.5 p-1 rounded-2xl ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'} transition-all duration-300`}>
          <button
            onClick={() => setIsDarkMode(false)}
            className={`flex justify-center items-center w-8 h-8 rounded-xl transition-all duration-300 cursor-pointer ${
              !isDarkMode ? 'bg-white text-amber-500 shadow-sm scale-105' : 'text-neutral-500 hover:text-neutral-300'
            }`}
            aria-label="Light Mode"
            id="sidebar-btn-light"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`flex justify-center items-center w-8 h-8 rounded-xl transition-all duration-300 cursor-pointer ${
              isDarkMode ? 'bg-neutral-950 text-amber-400 shadow-sm scale-105' : 'text-neutral-400 hover:text-neutral-600'
            }`}
            aria-label="Dark Mode"
            id="sidebar-btn-dark"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
