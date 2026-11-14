'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, PlusCircle, Clock, Menu } from 'lucide-react';
import { WriteNoteModal } from '../shared/WriteNoteModal';

interface Props {
  lastUpdated?: string;
  isLiveMcp?: boolean;
  onRefreshData?: () => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<Props> = ({
  lastUpdated,
  isLiveMcp,
  onRefreshData,
  onOpenMobileMenu,
}) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Poll MCP rate-limit status every 4 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch('/api/mcp/status');
        if (res.ok) {
          const data = await res.json();
          if (data.rateLimit) {
            setIsReady(data.rateLimit.isReady);
            setSecondsRemaining(data.rateLimit.secondsRemaining);
          }
        }
      } catch {
        // Silently tolerate polling errors
      }
    };

    checkStatus();
    timer = setInterval(checkStatus, 4000);
    return () => clearInterval(timer);
  }, []);

  // Tick countdown locally
  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const handleTriggerSync = async () => {
    if (!isReady || isSyncing) return;
    setIsSyncing(true);
    setSyncStatusMsg('Contacting MCP server...');

    try {
      const res = await fetch('/api/mcp/sync', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'RATE_LIMITED') {
        setSecondsRemaining(data.secondsRemaining || 60);
        setIsReady(false);
        setSyncStatusMsg(`Rate limited: wait ${data.secondsRemaining}s`);
      } else if (data.status === 'COMPLETED') {
        setSyncStatusMsg(data.message);
        setSecondsRemaining(61);
        setIsReady(false);
        if (onRefreshData) onRefreshData();
      } else if (data.status === 'ALL_DONE') {
        setSyncStatusMsg('All data layers synchronized.');
      } else if (data.status === 'TOKEN_MISSING') {
        setSyncStatusMsg('AQ_TOKEN not configured on server.');
      } else {
        setSyncStatusMsg(data.message || 'Sync failed');
      }
    } catch {
      setSyncStatusMsg('Network error triggering MCP sync.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 5000);
    }
  };

  return (
    <>
      <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        {/* Left: Mobile hamburger & System Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-2 text-xs">
            <span className="flex h-2 w-2 relative">
              {isLiveMcp ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              )}
            </span>
            <span className="font-medium text-slate-300 hidden sm:inline">
              {isLiveMcp ? 'Live MCP Connected' : 'Persistent Storage Mode'}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Rate Limit Cooldown pill */}
          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono border transition-all ${
              !isReady
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
            title="Strict 1 call/min limit enforced across all MCP requests"
          >
            <Clock className="w-3.5 h-3.5" />
            {!isReady ? (
              <span>MCP Cooldown: {secondsRemaining}s</span>
            ) : (
              <span className="hidden sm:inline">MCP: Ready (1 call/min)</span>
            )}
            {isReady && <span className="sm:hidden">Ready</span>}
          </div>

          {syncStatusMsg && (
            <div className="text-xs text-indigo-400 font-mono animate-in fade-in hidden md:block">
              {syncStatusMsg}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {lastUpdated && (
            <span className="text-[11px] text-slate-400 font-mono hidden lg:inline">
              Refreshed {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}

          {/* Step Sync Trigger */}
          <button
            onClick={handleTriggerSync}
            disabled={!isReady || isSyncing}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 disabled:opacity-50 transition"
            title="Trigger next sequence fetch (respects strict 60s cooldown)"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Next MCP Step'}</span>
            <span className="sm:hidden">Sync</span>
          </button>

          {/* Log Note Button */}
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Verified Note</span>
            <span className="sm:hidden">Note</span>
          </button>
        </div>
      </header>

      {/* Note Modal */}
      <WriteNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNoteAdded={() => {
          if (onRefreshData) onRefreshData();
        }}
      />
    </>
  );
};
