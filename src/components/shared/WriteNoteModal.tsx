'use client';

import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
  defaultAccount?: string;
}

export const WriteNoteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNoteAdded,
  defaultAccount = 'Eastern Counties Police Alliance',
}) => {
  const [account, setAccount] = useState(defaultAccount);
  const [kind, setKind] = useState('operational_investigation');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [rateLimitWait, setRateLimitWait] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setRateLimitWait(null);

    try {
      const res = await fetch('/api/mcp/write-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, kind, title, text }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.isRateLimited) {
          setRateLimitWait(data.retryAfterSeconds);
        }
        setErrorMsg(data.error || 'Failed to submit note.');
      } else {
        setSuccessMsg(data.message || 'Note successfully recorded in CRM.');
        setTimeout(() => {
          onNoteAdded();
          onClose();
        }, 1500);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-slate-100">
              Log Verified CRM Note
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="flex items-start space-x-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{errorMsg}</p>
                {rateLimitWait && (
                  <p className="mt-1 flex items-center text-rose-400">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Rate limiter requires waiting {rateLimitWait} seconds before next MCP call.
                  </p>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center space-x-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <p className="font-semibold">{successMsg}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Customer Account
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Eastern Counties Police Alliance">
                Eastern Counties Police Alliance
              </option>
              <option value="Aldermoor Industrial Group">
                Aldermoor Industrial Group
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Note Category / Kind
            </label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="operational_investigation">Operational Investigation</option>
              <option value="customer_commitment">Customer Commitment</option>
              <option value="risk_mitigation">Risk Mitigation</option>
              <option value="executive_update">Executive Update</option>
              <option value="meeting_minutes">Meeting Minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Note Subject / Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Proactive Telemetry Investigation into Dock #2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Detailed Observation / Evidence Log
            </label>
            <textarea
              required
              rows={4}
              placeholder="State verified findings, customer communications, or agreed operational action items..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-500">
              Validated against MCP write_note schema.
            </span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow disabled:opacity-50 transition flex items-center space-x-1.5"
              >
                {isSubmitting ? (
                  <span>Recording...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Commit Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
