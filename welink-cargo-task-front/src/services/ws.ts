export type WSMessage = { type: "zone-update"; payload: any } | { type: "admin-update"; payload: any };
export enum WebSocketStatusEnum {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}
class WSClient {
  private socket: WebSocket | null = null;
  private listeners: ((msg: WSMessage) => void)[] = [];
  private url: string;
  status: WebSocketStatusEnum = WebSocketStatusEnum.CLOSED;

  constructor(url: string) {
    console.log("Init WSClient", url);
    this.url = url;
  }

  connect() {
    console.log("connect ws");
    if (this.socket) return;
    this.status = WebSocketStatusEnum.CONNECTING;
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      this.status = WebSocketStatusEnum.OPEN;
      console.log("webSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as WSMessage;
        this.listeners.forEach((cb) => cb(msg));
      } catch (err) {
        console.error("invalid ws message", event.data, err);
      }
    };

    this.socket.onclose = () => {
      this.status = WebSocketStatusEnum.CLOSED;
      console.warn("webSocket closed");
      this.socket = null;
      setTimeout(() => this.connect(), 3000); // auto-reconnect
    };

    this.socket.onerror = (err) => {
      console.error("webSocket error", err);
      this.socket?.close();
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  send(msg: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
      console.log("⚡ WS message sent:", msg);
    } else {
      console.warn("ws not ready: ", msg);
    }
  }

  subscribe(gateId: string) {
    this.send({ type: "subscribe", payload: { gateId } });
  }

  unsubscribe(gateId: string) {
    this.send({ type: "unsubscribe", payload: { gateId } });
  }

  onMessage(cb: (msg: WSMessage) => void) {
    this.listeners.push(cb);
    // return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }
}

// singleton instance
export const wsClient = new WSClient(`ws://${process.env.NEXT_PUBLIC_API_URL}/ws`);
