export interface CacheStore {
  metadata: {
    lastUpdated: string;
    version: string;
    isLiveMcp: boolean;
  };
  mcpData: {
    whoami?: unknown;
    my_accounts?: unknown;
    paperwork_account_a?: unknown;
    paperwork_account_b?: unknown;
    signals?: unknown;
    flytbase_team?: unknown;
    feature_requests?: unknown;
    release_notes?: unknown;
    notes?: unknown[];
    data_format?: unknown;
  };
  syncProgress: {
    completedSteps: string[];
    pendingSteps: string[];
    lastStepTimestamp?: string;
  };
}

// In-memory cache
let inMemoryStore: CacheStore = {
  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    isLiveMcp: false,
  },
  mcpData: {},
  syncProgress: {
    completedSteps: [],
    pendingSteps: [
      'whoami',
      'get_my_accounts',
      'get_all_paperwork_a',
      'get_all_paperwork_b',
      'get_signals',
      'get_flytbase_team',
      'get_feature_requests',
      'get_release_notes',
      'list_notes',
    ],
  },
};

function getFsAndPath() {
  if (typeof window !== 'undefined') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    const cacheFile = path.join(process.cwd(), 'data', 'cache.json');
    return { fs, path, cacheFile };
  } catch {
    return null;
  }
}

function ensureDir(filePath: string) {
  const env = getFsAndPath();
  if (!env) return;
  const dir = env.path.dirname(filePath);
  if (!env.fs.existsSync(dir)) {
    try {
      env.fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Ignore in read-only environments
    }
  }
}

export class StorageCache {
  public static load(): CacheStore {
    const env = getFsAndPath();
    if (!env) return inMemoryStore;

    try {
      if (env.fs.existsSync(env.cacheFile)) {
        const fileContent = env.fs.readFileSync(env.cacheFile, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.metadata) {
          inMemoryStore = parsed;
        }
      }
    } catch {
      // Return memory fallback
    }
    return inMemoryStore;
  }

  public static save(store: Partial<CacheStore>): void {
    inMemoryStore = {
      ...inMemoryStore,
      ...store,
      metadata: {
        ...inMemoryStore.metadata,
        ...(store.metadata || {}),
        lastUpdated: new Date().toISOString(),
      },
    };

    const env = getFsAndPath();
    if (!env) return;

    try {
      ensureDir(env.cacheFile);
      env.fs.writeFileSync(env.cacheFile, JSON.stringify(inMemoryStore, null, 2), 'utf-8');
    } catch {
      // Read-only serverless environment fallback keeps memory store
    }
  }

  public static setToolData(toolKey: keyof CacheStore['mcpData'], data: unknown): void {
    const current = this.load();
    const updatedMcpData = {
      ...current.mcpData,
      [toolKey]: data,
    };

    this.save({
      mcpData: updatedMcpData,
      metadata: {
        ...current.metadata,
        isLiveMcp: true,
        lastUpdated: new Date().toISOString(),
      },
    });
  }

  public static markStepCompleted(step: string): void {
    const current = this.load();
    const completed = new Set(current.syncProgress.completedSteps);
    completed.add(step);
    const pending = current.syncProgress.pendingSteps.filter((s) => s !== step);

    this.save({
      syncProgress: {
        completedSteps: Array.from(completed),
        pendingSteps: pending,
        lastStepTimestamp: new Date().toISOString(),
      },
    });
  }
}
