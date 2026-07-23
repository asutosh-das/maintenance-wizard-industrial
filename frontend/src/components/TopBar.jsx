import { Bell, Search, Settings } from 'lucide-react';

export function TopBar({ currentView, onMenuClick, user, onProfileClick, searchQuery, onSearchChange }) {
  // Determine title based on view
  let title = 'Fleet Overview';
  if (currentView === 'explorer') title = 'Equipment Explorer';
  if (currentView === 'assistant') title = 'AI Assistant';
  if (currentView === 'quality') title = 'Data Quality Dashboard';
  if (currentView === 'detail') title = ''; // Handled by detail view itself

  if (currentView === 'detail') {
      return null; // Detail view has its own topbar in the screenshot
  }

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-border-subtle shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 text-text-muted hover:text-text-main">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        {currentView === 'assistant' && <BotIcon />}
        <h2 className="text-[20px] font-semibold text-text-main tracking-tight">{title}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        {(currentView === 'fleet' || currentView === 'explorer' || currentView === 'quality') && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder={currentView === 'quality' ? 'Search rows...' : 'Search equipment, tags...'}
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-[320px] h-9 bg-background border border-border-subtle rounded-lg pl-9 pr-3 text-[13px] text-text-main placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 border-l border-border-subtle pl-4 ml-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full text-text-muted hover:text-text-main hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full text-text-muted hover:text-text-main hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button
            id="topbar-profile-btn"
            onClick={onProfileClick}
            title={user?.name || 'Profile'}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-info text-white border border-primary/30 flex items-center justify-center text-xs font-bold ml-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
          >
            {user?.name ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : 'MW'}
          </button>
        </div>
      </div>
    </header>
  );
}

function BotIcon() {
    return (
        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/30 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
    )
}
