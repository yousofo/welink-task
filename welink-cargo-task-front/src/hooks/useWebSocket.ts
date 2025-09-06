// // hooks/useWebSocket.ts
// "use client";
// import { useEffect } from "react";
// import { WebSocketStatusEnum, wsClient, WSMessage } from "@/services/ws";
// import { useAppStore } from "@/store/store";
// import { IZone } from "@/lib/apiModels";

// export function useWebSocket(gateId?: string) {
//   const { zones, setZones } = useAppStore((s) => s);

//   useEffect(() => {
//     wsClient.connect();

//     const handleMessage = (msg: WSMessage) => {
//       console.log("ws received message:", msg);
//       if (msg.type === "zone-update") {
//         //update zones from zustand store based on the new zone
//         console.log("old zones:", zones);
//         const newZones = zones.map((zone) => {
//           if (zone.id === (msg.payload as IZone).id) {
//             return msg.payload;
//           }
//           return zone;
//         });
//         setZones(newZones);
//       }
//       if (msg.type === "admin-update") {
//         console.log("⚡ Admin update:", msg.payload);
//       }
//     };

//     const offMessage = wsClient.onMessage(handleMessage);

//     let unsubscribe = () => {};

//     if (gateId && wsClient.status === WebSocketStatusEnum.OPEN) {
//       wsClient.subscribe(gateId);
//       unsubscribe = () => wsClient.unsubscribe(gateId);
//     }

//     // Cleanup
//     return () => {
//       unsubscribe();
//       offMessage();
//     };
//   }, [gateId, wsClient.status]);
// }
