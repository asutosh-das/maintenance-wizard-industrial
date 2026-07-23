import { Search, SlidersHorizontal, Download, Plus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { equipmentList } from '../data';

export function EquipmentExplorer({ onNavigate, searchQuery }) {
  // Filter equipment based on search query
  const filteredEquipment = equipmentList.filter((eq) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      eq.name.toLowerCase().includes(lowerQuery) ||
      eq.tag.toLowerCase().includes(lowerQuery) ||
      eq.type.toLowerCase().includes(lowerQuery) ||
      eq.area.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden p-6 gap-6 max-w-[1800px] mx-auto">
      
      {/* Left Filters Sidebar */}
      <aside className="w-72 bg-surface border border-border-subtle rounded-xl flex flex-col overflow-y-auto shrink-0">
        <div className="p-5 border-b border-border-subtle flex justify-between items-center sticky top-0 bg-surface z-10">
          <h2 className="text-[18px] font-semibold text-text-main">Filters</h2>
          <button className="text-primary text-xs font-semibold uppercase tracking-wider hover:underline">Reset All</button>
        </div>
        <div className="p-5 space-y-6">
          <FilterSection title="Area">
            <Checkbox label="Zone A - Primary Milling" checked />
            <Checkbox label="Zone B - Finishing" />
            <Checkbox label="Zone C - Assembly" checked />
            <Checkbox label="Zone D - Packaging" />
          </FilterSection>
          
          <FilterSection title="Type">
            <Checkbox label="CNC Lathe" />
            <Checkbox label="Milling Machine" />
            <Checkbox label="Conveyor System" />
            <Checkbox label="Robotic Arm" />
          </FilterSection>
          
          <FilterSection title="Criticality">
            <Checkbox label="Safety-Critical" checked />
            <Checkbox label="High" />
            <Checkbox label="Medium" />
            <Checkbox label="Low" />
          </FilterSection>
        </div>
      </aside>

      {/* Main Table Area */}
      <div className="flex-1 bg-surface border border-border-subtle rounded-xl flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-semibold">Equipment List</span>
            <span className="bg-background px-2 py-0.5 rounded font-mono text-[12px] text-text-muted border border-border-subtle">{filteredEquipment.length} Total</span>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center justify-center w-8 h-8 rounded border border-border-subtle text-text-muted hover:bg-white/5 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
             </button>
             <button className="flex items-center justify-center w-8 h-8 rounded border border-border-subtle text-text-muted hover:bg-white/5 transition-colors">
                <Download className="w-4 h-4" />
             </button>
             <button className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-hover transition-colors text-[13px] font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Asset
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-background border-b border-border-subtle z-10">
              <tr>
                <th className="py-3 px-4 w-2"></th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Tag No</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Area</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Criticality</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Health Score</th>
                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Updated</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[13px]">
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-text-muted">
                    No equipment found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((eq, i) => {
                  let statusColor = 'bg-success';
                  if (eq.healthScore < 60) statusColor = 'bg-critical';
                  else if (eq.healthScore < 85) statusColor = 'bg-warning';

                  return (
                    <tr key={eq.id} onClick={() => onNavigate('detail')} className="hover:bg-white/5 transition-colors cursor-pointer group">
                      <td className="p-0 w-2">
                         <div className={`w-1 h-full ${statusColor}`}></div>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-text-main group-hover:text-primary">{eq.tag}</td>
                      <td className="py-2.5 px-4 font-medium text-text-main">{eq.name}</td>
                      <td className="py-2.5 px-4 text-text-muted">{eq.type}</td>
                      <td className="py-2.5 px-4 text-text-muted">{eq.area}</td>
                      <td className="py-2.5 px-4">
                        <CriticalityBadge level={eq.criticality} />
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`inline-flex items-center justify-center w-10 h-5 rounded-full font-mono text-[11px] font-bold ${
                           statusColor === 'bg-critical' ? 'bg-critical/15 text-critical border border-critical/30' :
                           statusColor === 'bg-warning' ? 'bg-warning/15 text-warning border border-warning/30' :
                           'bg-success/15 text-success border border-success/30'
                        }`}>
                          {eq.healthScore}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-text-muted font-mono text-[12px]">{eq.lastUpdated}</td>
                      <td className="py-2.5 px-4 text-right opacity-0 group-hover:opacity-100">
                        <button className="text-text-muted hover:text-text-main p-1 rounded hover:bg-white/10" onClick={(e) => { e.stopPropagation(); }}>
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 border-t border-border-subtle bg-background/50 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4 text-sm text-text-muted">
              <span>Total: {filteredEquipment.length} items</span>
           </div>
           <div className="flex items-center gap-1">
              <button className="p-1 px-2 border border-border-subtle rounded text-text-muted disabled:opacity-50 flex items-center gap-1 text-sm" disabled>
                 <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button className="w-7 h-7 rounded bg-primary/20 text-primary border border-primary/30 font-mono text-[12px] flex items-center justify-center">1</button>
              <button className="w-7 h-7 rounded hover:bg-white/5 text-text-muted font-mono text-[12px] flex items-center justify-center">2</button>
              <button className="w-7 h-7 rounded hover:bg-white/5 text-text-muted font-mono text-[12px] flex items-center justify-center">3</button>
              <span className="text-text-muted px-1 text-sm">...</span>
              <button className="flex items-center gap-1 p-1 px-2 border border-border-subtle rounded text-text-muted hover:bg-white/5 text-sm">
                 Next <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

function Checkbox({ label, checked }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-primary border-primary' : 'border-border-subtle bg-background group-hover:border-primary/50'}`}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-[13px] text-text-main group-hover:text-primary transition-colors">{label}</span>
    </label>
  )
}

function CriticalityBadge({ level }) {
  let color = 'border-text-muted text-text-muted';
  if (level === 'Safety-Critical') color = 'border-critical text-critical';
  if (level === 'High') color = 'border-warning text-warning';
  if (level === 'Medium') color = 'border-info text-info';

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border bg-transparent ${color}`}>
      {level}
    </span>
  )
}
