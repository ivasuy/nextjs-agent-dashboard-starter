const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_BEFORE = 5 * 60 * 1000; // 5 minutes before timeout

interface SessionCallback {
  onWarning: () => void;
  onTimeout: () => void;
}

class SessionMonitor {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private warningId: ReturnType<typeof setTimeout> | null = null;
  private callbacks: SessionCallback | null = null;
  private events = ['mousedown', 'keydown', 'scroll', 'touchstart'] as const;

  start(callbacks: SessionCallback) {
    this.callbacks = callbacks;
    this.resetTimers();
    this.events.forEach((event) => {
      document.addEventListener(event, this.handleActivity);
    });
  }

  stop() {
    this.clearTimers();
    this.events.forEach((event) => {
      document.removeEventListener(event, this.handleActivity);
    });
    this.callbacks = null;
  }

  private handleActivity = () => {
    this.resetTimers();
  };

  private resetTimers() {
    this.clearTimers();
    this.warningId = setTimeout(() => {
      this.callbacks?.onWarning();
    }, INACTIVITY_TIMEOUT - WARNING_BEFORE);

    this.timeoutId = setTimeout(() => {
      this.callbacks?.onTimeout();
    }, INACTIVITY_TIMEOUT);
  }

  private clearTimers() {
    if (this.warningId) clearTimeout(this.warningId);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}

export const sessionMonitor = new SessionMonitor();
