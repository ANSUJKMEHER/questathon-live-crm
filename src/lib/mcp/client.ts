import { JsonRpcRequest, JsonRpcResponse, McpToolName } from './types';
import { RateLimiter } from './rate-limiter';

const MCP_ENDPOINT = 'https://questathon.aihackerscollective.com/api/public/mcp';

export interface McpCallResult<T = unknown> {
  success: boolean;
  data?: T;
  rawText?: string;
  error?: string;
  isRateLimited?: boolean;
  retryAfterSeconds?: number;
  toolName: string;
  timestamp: string;
}

export class McpClient {
  private static requestIdCounter = 1;

  /**
   * Securely call an MCP tool over JSON-RPC.
   * Enforces 60-second rate limiting and strict token protection.
   */
  public static async callTool<T = unknown>(
    toolName: McpToolName,
    args: Record<string, unknown> = {}
  ): Promise<McpCallResult<T>> {
    const timestamp = new Date().toISOString();

    // 1. Check rate limit
    const rateLimit = RateLimiter.canMakeCall();
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Rate limit active: ${rateLimit.waitSecondsRemaining}s remaining before next MCP call is permitted.`,
        isRateLimited: true,
        retryAfterSeconds: rateLimit.waitSecondsRemaining,
        toolName,
        timestamp,
      };
    }

    // 2. Validate token presence without logging or exposing it
    const token = process.env.AQ_TOKEN;
    if (!token || token.trim() === '') {
      return {
        success: false,
        error: 'AQ_TOKEN environment variable is not configured on the server.',
        toolName,
        timestamp,
      };
    }

    // 3. Record call timestamp immediately to prevent concurrent call races
    RateLimiter.recordCall(toolName);

    // 4. Construct JSON-RPC payload
    const requestId = this.requestIdCounter++;
    const payload: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: requestId,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args,
      },
    };

    try {
      const response = await fetch(MCP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          'Authorization': `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `MCP server responded with HTTP status ${response.status} (${response.statusText})`,
          toolName,
          timestamp,
        };
      }

      const jsonResponse = (await response.json()) as JsonRpcResponse<T>;

      // Check JSON-RPC protocol error
      if (jsonResponse.error) {
        return {
          success: false,
          error: `MCP RPC Error [${jsonResponse.error.code}]: ${jsonResponse.error.message}`,
          toolName,
          timestamp,
        };
      }

      const result = jsonResponse.result;
      if (!result) {
        return {
          success: false,
          error: 'MCP response did not contain a valid result object.',
          toolName,
          timestamp,
        };
      }

      if (result.isError) {
        const errorDetail =
          result.content && result.content.length > 0
            ? result.content.map((c) => c.text).filter(Boolean).join(' ')
            : 'Tool reported execution error (result.isError = true)';
        return {
          success: false,
          error: errorDetail,
          toolName,
          timestamp,
        };
      }

      // Extract content from result
      let rawText = '';
      let parsedData: T | undefined = undefined;

      if (result.content && Array.isArray(result.content) && result.content.length > 0) {
        const textParts = result.content
          .map((item) => item.text || '')
          .filter(Boolean);
        rawText = textParts.join('\n');

        if (rawText) {
          try {
            parsedData = JSON.parse(rawText) as T;
          } catch {
            // Content might be plain text or markdown, which is valid
            parsedData = rawText as unknown as T;
          }
        }
      } else if (result.data !== undefined) {
        parsedData = result.data;
        rawText = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);
      }

      return {
        success: true,
        data: parsedData,
        rawText,
        toolName,
        timestamp,
      };
    } catch (err: unknown) {
      // Safe error formatting that guarantees NO token exposure
      const errMessage = err instanceof Error ? err.message : 'Unknown network error';
      // Strip any accidental bearer token if it somehow appeared in error text
      const sanitizedMessage = token ? errMessage.replace(new RegExp(token, 'g'), '[REDACTED]') : errMessage;

      return {
        success: false,
        error: `MCP Connection Failure: ${sanitizedMessage}`,
        toolName,
        timestamp,
      };
    }
  }
}
