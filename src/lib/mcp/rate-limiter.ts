import { RateLimitState } from './types';

const COOLDOWN_MS = 61000; // 61 seconds (60s + 1s safety buffer to avoid edge-of-second rejections)

// In-memory fallback
let memoryState: RateLimitState = {
  lastCallTimestamp: 0,
  lastToolName: '',
  cooldownPeriodMs: COOLDOWN_MS,
};

function getFsAndPath() {
  if (typeof window !== 'undefined') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    const rateLimitFile = path.join(process.cwd(), 'data', 'rate-limit.json');
    return { fs, path, rateLimitFile };
  } catch {
    return null;
  }
}

function ensureDataDir(): void {
  const env = getFsAndPath();
  if (!env) return;
  const dir = env.path.dirname(env.rateLimitFile);
  if (!env.fs.existsSync(dir)) {
    try {
      env.fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignore if cannot write to filesystem
    }
  }
}

function loadRateLimitState(): RateLimitState {
  const env = getFsAndPath();
  if (!env) return memoryState;

  try {
    if (env.fs.existsSync(env.rateLimitFile)) {
      const data = env.fs.readFileSync(env.rateLimitFile, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed.lastCallTimestamp) {
        memoryState = {
          lastCallTimestamp: parsed.lastCallTimestamp,
          lastToolName: parsed.lastToolName || '',
          cooldownPeriodMs: COOLDOWN_MS,
        };
      }
    }
  } catch {
    // Return memoryState on read error
  }
  return memoryState;
}

function saveRateLimitState(state: RateLimitState): void {
  memoryState = state;
  const env = getFsAndPath();
  if (!env) return;

  try {
    ensureDataDir();
    env.fs.writeFileSync(env.rateLimitFile, JSON.stringify(state, null, 2), 'utf-8');
  } catch {
    // Memory store preserved
  }
}

export class RateLimiter {
  public static canMakeCall(): {
    allowed: boolean;
    waitSecondsRemaining: number;
    lastCallTimestamp: number;
    lastToolName: string;
  } {
    const state = loadRateLimitState();
    const now = Date.now();
    const elapsed = now - state.lastCallTimestamp;

    if (state.lastCallTimestamp === 0 || elapsed >= COOLDOWN_MS) {
      return {
        allowed: true,
        waitSecondsRemaining: 0,
        lastCallTimestamp: state.lastCallTimestamp,
        lastToolName: state.lastToolName,
      };
    }

    const waitSecondsRemaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return {
      allowed: false,
      waitSecondsRemaining,
      lastCallTimestamp: state.lastCallTimestamp,
      lastToolName: state.lastToolName,
    };
  }

  public static recordCall(toolName: string): void {
    const now = Date.now();
    saveRateLimitState({
      lastCallTimestamp: now,
      lastToolName: toolName,
      cooldownPeriodMs: COOLDOWN_MS,
    });
  }

  public static getStatus(): {
    isReady: boolean;
    secondsRemaining: number;
    lastCallTimestamp: number | null;
    lastToolCalled: string | null;
    cooldownPeriodSeconds: number;
  } {
    const status = this.canMakeCall();
    return {
      isReady: status.allowed,
      secondsRemaining: status.waitSecondsRemaining,
      lastCallTimestamp: status.lastCallTimestamp > 0 ? status.lastCallTimestamp : null,
      lastToolCalled: status.lastToolName || null,
      cooldownPeriodSeconds: Math.round(COOLDOWN_MS / 1000),
    };
  }
}
