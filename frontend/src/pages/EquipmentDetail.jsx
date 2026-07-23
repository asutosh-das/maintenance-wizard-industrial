import { ArrowLeft, Edit, AlertTriangle, CheckCircle2, ChevronRight, Activity, Thermometer, Droplet, Settings } from 'lucide-react';

export function EquipmentDetail({ onNavigate }) {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
      {/* Header Profile */}
      <div className="bg-surface border-b border-border-subtle p-6 md:p-8 shrink-0 relative overflow-hidden">
         {/* Subtle background graphic */}
         <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
            <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
               <path d="M50 0L350 200M0 50L400 50M100 0V200M200 0V200M300 0V200" stroke="white" strokeWidth="2" fill="none" />
            </svg>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
               <div className="flex items-center gap-2 text-[12px] text-text-muted mb-4 uppercase tracking-wider font-semibold">
                  <button onClick={() => onNavigate('explorer')} className="hover:text-primary transition-colors flex items-center gap-1">
                     <ArrowLeft className="w-4 h-4" /> Explorer
                  </button>
                  <ChevronRight className="w-3 h-3" />
                  <span>North Plant</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-text-main">P-102</span>
               </div>
               
               <div className="flex items-end gap-4">
                  <h1 className="text-4xl font-bold text-text-main tracking-tight">Centrifugal Pump <span className="font-mono text-text-muted text-3xl font-light ml-2">P-102</span></h1>
                  <span className="bg-critical/15 text-critical border border-critical/30 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                     <AlertTriangle className="w-3 h-3" /> Critical Anomaly
                  </span>
               </div>
               <p className="text-[14px] text-text-muted mt-2">Primary cooling loop circulation pump. Rated 150kW.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
               <button className="flex-1 md:flex-none justify-center bg-background border border-border-subtle text-text-main hover:bg-white/5 transition-colors px-4 py-2 rounded-lg text-[13px] font-semibold flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit Details
               </button>
               <button className="flex-1 md:flex-none justify-center bg-primary text-white hover:bg-primary-hover transition-colors px-4 py-2 rounded-lg text-[13px] font-semibold">
                  Generate Report
               </button>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-6">
         
         {/* Left Column: Metrics & Chart */}
         <div className="xl:col-span-8 space-y-6">
            
            {/* Live Telemetry Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <MetricCard title="Vibration (Axial)" value="14.2" unit="mm/s" icon={Activity} status="critical" trend="+2.1/hr" />
               <MetricCard title="Temperature" value="84.5" unit="°C" icon={Thermometer} status="warning" trend="+2.5/hr" />
               <MetricCard title="Flow Rate" value="1,240" unit="L/min" icon={Settings} status="success" trend="-5.0/hr" />
               <MetricCard title="Lube Level" value="15" unit="%" icon={Droplet} status="warning" trend="-2.0/day" />
            </div>

            {/* Time Series Chart */}
            <div className="bg-surface border border-border-subtle rounded-xl p-6 flex flex-col min-h-[400px]">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[16px] font-semibold text-text-main flex items-center gap-2">
                     <Activity className="w-4 h-4 text-primary" /> Vibration Trends
                  </h3>
                  <div className="flex bg-background border border-border-subtle rounded p-0.5">
                     <TimeTab label="1H" />
                     <TimeTab label="6H" active />
                     <TimeTab label="24H" />
                     <TimeTab label="7D" />
                  </div>
               </div>

               {/* Mock Chart Area */}
               <div className="flex-1 relative border-l border-b border-border-subtle ml-8 mb-6 mt-4">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                     {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="w-full h-px bg-border-subtle/50 relative">
                           <span className="absolute -left-8 -top-2.5 text-[10px] text-text-muted font-mono">{20 - (i * 4)}</span>
                        </div>
                     ))}
                  </div>

                  {/* Chart Line SVG */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0,80 Q10,78 20,75 T40,65 T60,50 T75,30 T90,20 L100,10" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                     {/* Threshold line */}
                     <line x1="0" y1="50" x2="100" y2="50" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                  </svg>

                  {/* X Axis Labels */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-text-muted font-mono">
                     <span>10:00</span>
                     <span>11:00</span>
                     <span>12:00</span>
                     <span>13:00</span>
                     <span>14:00 (Now)</span>
                  </div>
               </div>
               
               <div className="flex gap-6 justify-center">
                  <ChartLegend color="bg-primary" label="Axial (mm/s)" />
                  <ChartLegend color="bg-border-subtle" label="Radial (mm/s)" />
                  <ChartLegend color="bg-critical" label="Threshold (10 mm/s)" />
               </div>
            </div>
         </div>

         {/* Right Column: Details & Activity */}
         <div className="xl:col-span-4 space-y-6">
            
            {/* Status Panel */}
            <div className="bg-surface border border-border-subtle rounded-xl p-6">
               <h3 className="text-[16px] font-semibold text-text-main mb-4 border-b border-border-subtle pb-4">Current Status</h3>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full border-[4px] border-critical/30 flex items-center justify-center relative">
                     <div className="absolute inset-0 rounded-full border-[4px] border-critical" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }}></div>
                     <span className="font-mono text-lg font-bold text-critical">32</span>
                  </div>
                  <div>
                     <div className="text-[14px] font-medium text-text-main">Overall Health Score</div>
                     <div className="text-[12px] text-critical flex items-center gap-1 mt-1">
                        <AlertTriangle className="w-3 h-3" /> Drops by 15 pts in 24h
                     </div>
                  </div>
               </div>
               
               <div className="space-y-3 text-[13px]">
                  <DetailRow label="Asset ID" value="P-102" mono />
                  <DetailRow label="Area" value="North Plant > Sector 4" />
                  <DetailRow label="Installation" value="Oct 12, 2021" mono />
                  <DetailRow label="Last Maintenance" value="Sep 01, 2023" mono />
               </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col h-[400px]">
               <div className="p-5 border-b border-border-subtle bg-background/30 shrink-0">
                  <h3 className="text-[16px] font-semibold text-text-main">Recent Activity</h3>
               </div>
               <div className="p-5 overflow-y-auto space-y-5 flex-1 relative">
                  <div className="absolute left-[29px] top-5 bottom-5 w-px bg-border-subtle z-0"></div>
                  
                  <ActivityItem 
                     type="alert"
                     title="Vibration Threshold Exceeded"
                     time="Today, 13:45"
                     desc="Axial vibration reached 14.2 mm/s."
                  />
                  <ActivityItem 
                     type="info"
                     title="AI Analysis Completed"
                     time="Today, 14:02"
                     desc="Likely bearing fault identified."
                  />
                  <ActivityItem 
                     type="success"
                     title="Routine Maintenance"
                     time="Sep 01, 2023"
                     desc="Lubrication topped up, visual inspection clear."
                  />
               </div>
            </div>

         </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, icon: Icon, status, trend }) {
   let color = 'text-text-main border-border-subtle';
   let bg = 'bg-surface';
   if (status === 'critical') { color = 'text-critical border-critical/50'; bg = 'bg-critical/5'; }
   else if (status === 'warning') { color = 'text-warning border-warning/50'; bg = 'bg-warning/5'; }
   else if (status === 'success') { color = 'text-success'; }

   return (
      <div className={`${bg} border rounded-xl p-4 flex flex-col justify-between h-[120px] ${color}`}>
         <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">{title}</span>
            <Icon className={`w-4 h-4 ${status === 'success' ? 'text-success' : 'opacity-70'}`} />
         </div>
         <div className="flex items-end justify-between">
            <div className={`text-2xl font-bold font-mono tracking-tight ${status === 'critical' ? 'text-critical' : status === 'warning' ? 'text-warning' : 'text-text-main'}`}>
               {value}<span className="text-sm font-sans font-normal ml-1 opacity-70">{unit}</span>
            </div>
            <div className="text-[11px] font-mono text-text-muted bg-background px-1.5 py-0.5 rounded border border-border-subtle">
               {trend}
            </div>
         </div>
      </div>
   )
}

function TimeTab({ label, active }) {
   return (
      <button className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors ${active ? 'bg-surface text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}>
         {label}
      </button>
   )
}

function ChartLegend({ color, label }) {
   return (
      <div className="flex items-center gap-2">
         <div className={`w-3 h-0.5 ${color}`}></div>
         <span className="text-[11px] font-medium text-text-muted">{label}</span>
      </div>
   )
}

function DetailRow({ label, value, mono }) {
   return (
      <div className="flex justify-between items-center py-2 border-b border-border-subtle/50 last:border-0">
         <span className="text-text-muted">{label}</span>
         <span className={`text-text-main ${mono ? 'font-mono text-[12px]' : ''}`}>{value}</span>
      </div>
   )
}

function ActivityItem({ type, title, time, desc }) {
   let icon = <CheckCircle2 className="w-3 h-3 text-success" />;
   let ring = 'border-success';
   
   if (type === 'alert') {
      icon = <AlertTriangle className="w-3 h-3 text-critical" />;
      ring = 'border-critical';
   } else if (type === 'info') {
      icon = <Activity className="w-3 h-3 text-info" />;
      ring = 'border-info';
   }

   return (
      <div className="relative z-10 flex gap-4">
         <div className="mt-0.5 shrink-0">
            <div className={`w-6 h-6 rounded-full bg-surface border-2 flex items-center justify-center ${ring}`}>
               {icon}
            </div>
         </div>
         <div className="pb-1">
            <div className="text-[13px] font-semibold text-text-main mb-0.5">{title}</div>
            <div className="text-[11px] font-mono text-text-muted mb-1.5">{time}</div>
            <div className="text-[13px] text-text-muted leading-relaxed">{desc}</div>
         </div>
      </div>
   )
}
