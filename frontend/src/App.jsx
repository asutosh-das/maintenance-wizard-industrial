import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FleetOverview } from './pages/FleetOverview';
import { EquipmentExplorer } from './pages/EquipmentExplorer';
import { AIAssistant } from './pages/AIAssistant';
import { DataQuality } from './pages/DataQuality';
import { EquipmentDetail } from './pages/EquipmentDetail';
import { EquipmentAnalysis } from './pages/EquipmentAnalysis';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';

export default function App() {
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup'
  const [user, setUser] = useState(null);             // null = not logged in
  const [currentView, setCurrentView] = useState('fleet');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('mw_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('mw_user', JSON.stringify(userData));
    setCurrentView('fleet');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mw_user');
    setAuthView('login');
  };

  // Auth screens
  if (!user) {
    if (authView === 'signup') {
      return <Signup onNavigate={setAuthView} />;
    }
    return <Login onNavigate={setAuthView} onLogin={handleLogin} />;
  }

  // Profile page (full-screen)
  if (currentView === 'profile') {
    return (
      <Profile
        user={user}
        onLogout={handleLogout}
        onNavigate={setCurrentView}
      />
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/30 selection:text-white flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} md:w-64 shrink-0 transition-all duration-300 ease-in-out border-r border-border-subtle bg-surface z-20`}>
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          currentView={currentView}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onProfileClick={() => setCurrentView('profile')}
          searchQuery={globalSearchQuery}
          onSearchChange={setGlobalSearchQuery}
        />

        <main className="flex-1 overflow-auto bg-background">
          {currentView === 'fleet'     && <FleetOverview />}
          {currentView === 'explorer'  && <EquipmentExplorer onNavigate={setCurrentView} searchQuery={globalSearchQuery} />}
          {currentView === 'detail'    && <EquipmentDetail onNavigate={setCurrentView} />}
          {currentView === 'assistant' && <AIAssistant />}
          {currentView === 'quality'   && <DataQuality globalSearchQuery={globalSearchQuery} />}
          {currentView === 'analysis'  && <EquipmentAnalysis />}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
