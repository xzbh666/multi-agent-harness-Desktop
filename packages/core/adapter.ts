export type Capability = 'stream' | 'cancel' | 'resume' | 'model-selection' | 'native-approval';
export interface AgentProfile { id: string; adapterId: string; executable: string; model?: string }
export interface RunRequest { taskId: string; runId: string; cwd: string; prompt: string; profile: AgentProfile; nativeSessionId?: string }
export type AgentEvent =
  | { type: 'session'; nativeSessionId: string }
  | { type: 'text'; text: string }
  | { type: 'approval'; requestId: string; description: string }
  | { type: 'error'; message: string }
  | { type: 'exit'; code: number | null };
export interface AgentAdapter {
  id: string;
  detect(): Promise<{ available: boolean; version?: string; capabilities: Capability[] }>;
  run(request: RunRequest, signal: AbortSignal): AsyncIterable<AgentEvent>;
}
// Contract only: adapters must reject unsupported explicit selections and
// must not silently bypass runtime approvals or claim unsupported resume.
