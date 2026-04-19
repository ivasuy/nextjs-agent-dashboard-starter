import type { WSEventName, WSEventPayload, WSMessage } from './ws-events';
import { ReconnectManager } from './ws-reconnect';

type EventHandler<E extends WSEventName> = (data: WSEventPayload<E>) => void;

class WSClient {
  private ws: WebSocket | null = null;
  private listeners = new Map<string, Set<EventHandler<WSEventName>>>();
  private reconnect = new ReconnectManager();
  private url: string | null = null;

  connect(url: string) {
    this.url = url;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.reconnect.reset();
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        this.emit(message.event, message.data);
      } catch {
        /* malformed message */
      }
    };

    this.ws.onclose = () => {
      this.reconnect.scheduleReconnect(() => {
        if (this.url) this.connect(this.url);
      });
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  disconnect() {
    this.reconnect.reset();
    this.ws?.close();
    this.ws = null;
    this.url = null;
  }

  subscribe<E extends WSEventName>(event: E, handler: EventHandler<E>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler as EventHandler<WSEventName>);

    return () => {
      this.listeners.get(event)?.delete(handler as EventHandler<WSEventName>);
    };
  }

  private emit<E extends WSEventName>(event: E, data: WSEventPayload<E>) {
    this.listeners.get(event)?.forEach((handler) => handler(data));
  }
}

export const wsClient = new WSClient();
