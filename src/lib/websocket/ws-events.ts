export interface WSEventMap {
  'notification:new': {
    id: string;
    title: string;
    message: string;
    type: string;
  };
  'campaign:status_changed': { campaignId: string; status: string };
  'creative:generated': { creativeId: string; url: string };
  'upload:progress': { uploadId: string; progress: number };
  'upload:complete': { uploadId: string; url: string };
  'sync:started': { platform: string };
  'sync:complete': { platform: string };
  'workspace:updated': { workspaceId: string };
}

export type WSEventName = keyof WSEventMap;
export type WSEventPayload<E extends WSEventName> = WSEventMap[E];

export interface WSMessage<E extends WSEventName = WSEventName> {
  event: E;
  data: WSEventPayload<E>;
  timestamp: string;
}
