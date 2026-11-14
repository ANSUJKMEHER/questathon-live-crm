'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Shield,
  Building2,
  Briefcase,
  Users,
  CheckSquare,
  AlertOctagon,
  HelpCircle,
  Radio,
  Database,
  Plane,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/eastern-counties', label: 'Eastern Counties', icon: Shield, badge: 'Gov' },
  { href: '/aldermoor', label: 'Aldermoor', icon: Building2, badge: 'Corp' },
  { href: '/deals', label: 'Deals & Valuation', icon: Briefcase },
  { href: '/stakeholders', label: 'Stakeholders & Power', icon: Users },
  { href: '/action-plan', label: 'Action Plan', icon: CheckSquare },
  { href: '/risks', label: 'Risk Register', icon: AlertOctagon },
  { href: '/unknowns', label: 'Unknowns Register', icon: HelpCircle },
  { href: '/live-events', label: 'Live Signals', icon: Radio, pulse: true },
  { href: '/evidence', label: 'Evidence & Sources', icon: Database },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Plane className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>FlytBase CRM</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 font-mono rounded">
                LIVE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
              Autonomous Drones
            </div>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Workspaces
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {item.badge}
                  </span>
                )}
                {item.pulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Account Indicator */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] font-medium text-slate-300">
            Questathon Challenge
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
            <span>Customer Success CSM</span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
