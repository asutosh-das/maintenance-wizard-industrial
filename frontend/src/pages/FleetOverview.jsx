import { ArrowDownRight, ArrowRight, CheckCircle2, History, AlertTriangle, MonitorPlay } from 'lucide-react';
import { actionRequiredAlerts } from '../data';

export function FleetOverview() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Total Equipment" value="1,248" icon={MonitorPlay} trend={null} />
        <KPICard title="Avg Health Score" value="84%" icon={CheckCircle2} trend={{ value: '+2%', positive: true }} />
        <KPICard title="Open Alerts" value="12" icon={AlertTriangle} trend={{ value: '+4', positive: false }} alert />
        <KPICard title="Stale Data" value="4" icon={History} trend={{ value: '-2', positive: true }} warning />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6 lg:col-span-8 flex flex-col">
          <h3 className="text-[18px] font-semibold text-text-main mb-6">Health Status Distribution</h3>
          
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[280px]">
            {/* Simple SVG Donut */}
            <svg viewBox="0 0 100 100" className="w-64 h-64 transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#26344F" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray="150.7 251.2" strokeDashoffset="-100.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#06B6D4" strokeWidth="12" strokeDasharray="50.2 251.2" strokeDashoffset="-50.2" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="37.6 251.2" strokeDashoffset="-12.5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="12" strokeDasharray="12.5 251.2" strokeDashoffset="0" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-3xl font-bold text-text-main">1,248</span>
              <span className="text-xs text-text-muted uppercase tracking-wider mt-1">Assets</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border-subtle">
            <LegendItem color="bg-success" label="Healthy" count="748" />
            <LegendItem color="bg-info" label="Watch" count="250" />
            <LegendItem color="bg-warning" label="Warning" count="190" />
            <LegendItem color="bg-critical" label="Critical" count="60" />
          </div>
        </div>

        {/* Filters Panel (Visual only for now) */}
        <div className="bg-surface border border-border-subtle rounded-xl p-6 lg:col-span-4 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] font-semibold text-text-main">Filters</h3>
            <button className="text-primary text-sm hover:underline">Clear All</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-3">Area</label>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All" />
                <FilterChip label="North Plant" active />
                <FilterChip label="South Sector" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-3">Criticality</label>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All" />
                <FilterChip label="Critical" active color="critical" />
                <FilterChip label="Warning" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Required Table */}
      <div className="bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-background/50">
          <h3 className="text-[18px] font-semibold text-text-main">Action Required</h3>
          <button className="text-sm text-primary hover:text-primary-hover transition-colors font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/30 border-b border-border-subtle">
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Tag No</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Equipment Name</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Area</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Score</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Updated</th>
                <th className="px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {actionRequiredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-white/5 transition-colors cursor-pointer group h-12">
                  <td className="px-5 font-mono text-[13px] text-text-main group-hover:text-primary">{alert.tag}</td>
                  <td className="px-5 text-[14px] text-text-muted">{alert.name}</td>
                  <td className="px-5 text-[14px] text-text-muted">{alert.area}</td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      alert.status === 'Critical' ? 'bg-critical/15 text-critical border border-critical/30' : 'bg-warning/15 text-warning border border-warning/30'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-5">
                    <div className={`inline-flex px-2 py-0.5 rounded-full bg-background border border-border-subtle font-mono text-[12px] ${
                       alert.status === 'Critical' ? 'text-critical' : 'text-warning'
                    }`}>
                      {alert.score}
                    </div>
                  </td>
                  <td className="px-5 text-[13px] text-text-muted">{alert.lastUpdated}</td>
                  <td className="px-5 text-right">
                    {alert.status === 'Critical' ? (
                      <ArrowDownRight className="w-4 h-4 text-critical inline-block" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-warning inline-block" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, trend, alert, warning }) {
  let valueColor = 'text-text-main';
  if (alert) valueColor = 'text-critical';
  if (warning) valueColor = 'text-warning';

  return (
    <div className={`bg-surface border rounded-xl p-5 flex flex-col justify-between h-[120px] transition-colors ${alert ? 'border-critical/50' : 'border-border-subtle hover:border-primary/50'}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{title}</span>
        <Icon className={`w-5 h-5 ${alert ? 'text-critical' : warning ? 'text-warning' : 'text-text-muted'}`} />
      </div>
      <div className="flex items-baseline gap-3">
        <div className={`text-3xl font-bold font-mono tracking-tight ${valueColor}`}>{value}</div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono ${trend.positive ? 'bg-success/15 text-success' : 'bg-critical/15 text-critical'}`}>
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
}

function LegendItem({ color, label, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-xs text-text-muted">{label} <span className="text-text-main ml-1">({count})</span></span>
    </div>
  );
}

function FilterChip({ label, active, color }) {
  let classes = "px-3 py-1.5 rounded-full text-[12px] font-medium border cursor-pointer transition-colors ";
  
  if (active) {
    if (color === 'critical') classes += "bg-critical/20 border-critical text-critical";
    else classes += "bg-primary/20 border-primary text-primary";
  } else {
    classes += "bg-background border-border-subtle text-text-main hover:border-primary/50";
  }
  
  return <div className={classes}>{label}</div>;
}
