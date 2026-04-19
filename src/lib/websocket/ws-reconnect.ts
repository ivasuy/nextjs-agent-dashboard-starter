interface ReconnectOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
}

export class ReconnectManager {
  private retries = 0;
  private maxRetries: number;
  private baseDelay: number;
  private maxDelay: number;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(options: ReconnectOptions = {}) {
    this.maxRetries = options.maxRetries ?? 10;
    this.baseDelay = options.baseDelay ?? 1000;
    this.maxDelay = options.maxDelay ?? 30000;
  }

  scheduleReconnect(callback: () => void): boolean {
    if (this.retries >= this.maxRetries) return false;

    const delay = Math.min(this.baseDelay * Math.pow(2, this.retries), this.maxDelay);
    this.retries++;
    this.timeoutId = setTimeout(callback, delay);
    return true;
  }

  reset() {
    this.retries = 0;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  get currentRetry() {
    return this.retries;
  }
}
