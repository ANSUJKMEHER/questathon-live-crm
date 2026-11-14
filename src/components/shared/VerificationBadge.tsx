import React from 'react';
import { VerificationStatus } from '@/lib/types/crm';
import { CheckCircle2, AlertTriangle, HelpCircle, FileCheck, Info } from 'lucide-react';

interface Props {
  status: VerificationStatus;
  size?: 'sm' | 'md';
  onClickSource?: () => void;
}

export const VerificationBadge: React.FC<Props> = ({ status, size = 'sm', onClickSource }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'VERIFIED_FACT':
        return {
          label: 'Verified Fact',
          classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25',
          icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
        };
      case 'CUSTOMER_CLAIM':
        return {
          label: 'Customer Claim',
          classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25',
          icon: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
        };
      case 'UNVERIFIED_ESTIMATE':
        return {
          label: 'Unverified Estimate',
          classes: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/25',
          icon: <FileCheck className="w-3.5 h-3.5 mr-1" />,
        };
      case 'INFERENCE':
        return {
          label: 'Inference',
          classes: 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25',
          icon: <Info className="w-3.5 h-3.5 mr-1" />,
        };
      case 'UNKNOWN':
      default:
        return {
          label: 'Unknown',
          classes: 'bg-slate-700/50 text-slate-400 border-slate-600 hover:bg-slate-700',
          icon: <HelpCircle className="w-3.5 h-3.5 mr-1" />,
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <button
      type="button"
      onClick={onClickSource}
      className={`inline-flex items-center font-medium rounded-full border transition-all ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${config.classes} ${onClickSource ? 'cursor-pointer' : 'cursor-default'}`}
      title={onClickSource ? 'Click to inspect original evidence record' : undefined}
    >
      {config.icon}
      <span>{config.label}</span>
    </button>
  );
};
