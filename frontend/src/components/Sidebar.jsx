import { Activity, Bot, Cpu, Settings, Ship, BarChart2 } from 'lucide-react';

export function Sidebar({ currentView, onNavigate }) {
  const navItems = [
    { id: 'fleet',    label: 'Fleet Overview',      icon: Ship },
    { id: 'explorer', label: 'Equipment Explorer',  icon: Cpu },
    { id: 'analysis', label: 'Equipment Analysis',  icon: BarChart2 },
    { id: 'assistant',label: 'AI Assistant',        icon: Bot },
    { id: 'quality',  label: 'Data Quality',        icon: Activity },
  ];


  return (
    <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-border-subtle bg-surface flex-col z-50">
      <div className="p-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-text-main leading-tight">Maintenance</h1>
            <p className="text-[12px] font-mono text-text-muted uppercase tracking-wider">Wizard</p>
          </div>
        </div>
      </div>
      
      <ul className="flex flex-col gap-2 flex-grow px-4 mt-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id || (item.id === 'explorer' && currentView === 'detail');
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-text-muted hover:text-text-main hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      
      <div className="mt-auto p-6 shrink-0">
         <div className="bg-background rounded-lg p-4 border border-border-subtle text-center">
            <Activity className="w-5 h-5 text-text-muted mx-auto mb-2 opacity-50" />
            <p className="text-[10px] text-text-muted font-mono uppercase">DB Status: Online</p>
         </div>
      </div>
    </nav>
  );
}
