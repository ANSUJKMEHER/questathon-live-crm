import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate';
  onInspectSource?: () => void;
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'indigo',
  onInspectSource,
}) => {
  const getBadgeColors = () => {
    switch (badgeColor) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'rose':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'slate':
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="p-2 bg-slate-800/80 rounded-lg text-slate-300 group-hover:text-indigo-400 transition">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-slate-100 tracking-tight">
          {value}
        </div>
        {badge && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getBadgeColors()}`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">{subtitle}</span>
        {onInspectSource && (
          <button
            onClick={onInspectSource}
            className="text-indigo-400 hover:text-indigo-300 font-mono text-[11px] underline underline-offset-2 transition"
          >
            Trace Source
          </button>
        )}
      </div>
    </div>
  );
};
