import React from 'react';
import { LiveEventItem } from '@/lib/types/crm';
import { Radio, AlertTriangle, UserX, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

interface Props {
  events: LiveEventItem[];
  onLogNoteForEvent?: (event: LiveEventItem) => void;
}

export const LiveEventsSection: React.FC<Props> = ({ events, onLogNoteForEvent }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'OPERATIONAL_ANOMALY':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'CUSTOMER_COMMITMENT':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'PERSONNEL_CHANGE':
        return <UserX className="w-4 h-4 text-purple-400" />;
      default:
        return <Radio className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'IMMEDIATE':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
    }
  };

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            Live Signals & Critical Events Stream
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Source: MCP get_signals
        </span>
      </div>

      <div className="p-6 space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                  {getEventIcon(evt.eventType)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-100">{evt.title}</h4>
                    <span
                      className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-full border ${getUrgencyBadge(
                        evt.urgency
                      )}`}
                    >
                      {evt.urgency}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-400 font-medium">
                    {evt.account}
                  </span>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-400 block">{evt.operationalStatus}</span>
                <span className="font-mono text-[10px] text-slate-400">
                  {new Date(evt.detectedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed">
              {evt.description}
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Prescribed CRM Action Response:
              </span>
              <ul className="space-y-1">
                {evt.recommendedActions.map((rec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-xs text-slate-300 space-x-2"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div className="space-x-4">
                <span>Internal Lead: <strong className="text-slate-300">{evt.internalOwner}</strong></span>
                <span>Contact: <strong className="text-slate-300">{evt.customerContact}</strong></span>
              </div>

              {onLogNoteForEvent && (
                <button
                  onClick={() => onLogNoteForEvent(evt)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2"
                >
                  Create Incident Check-in Note →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
