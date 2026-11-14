export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: 'tools/call' | 'tools/list';
  params: {
    name: string;
    arguments?: Record<string, unknown>;
  };
}

export interface McpContentItem {
  type: string;
  text?: string;
  data?: unknown;
}

export interface JsonRpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: string | number;
  result?: {
    content?: McpContentItem[];
    isError?: boolean;
    data?: T;
    [key: string]: unknown;
  };
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export type McpToolName =
  | 'whoami'
  | 'get_my_accounts'
  | 'get_file'
  | 'list_paperwork'
  | 'get_all_paperwork'
  | 'search_paperwork'
  | 'get_paperwork_record'
  | 'get_feature_requests'
  | 'get_release_notes'
  | 'get_flytbase_team'
  | 'get_signals'
  | 'get_data_format'
  | 'list_notes'
  | 'write_note';

export interface RateLimitState {
  lastCallTimestamp: number;
  lastToolName: string;
  cooldownPeriodMs: number; // 60,000ms + safety buffer (61,000ms)
}
