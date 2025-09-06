"use client";
import { useAppStore } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";

interface ITicketInfo {
  ticket_id: string;
  checkin_at: string;
  user_type: string;
  gate_name: string;
  zone_id: string;
  gate_id: string;
}

function CheckInSuccess() {
  const { checkInSuccess, setCheckInSuccess } = useAppStore((state) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<ITicketInfo | null>(null);
  //
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  //
  const activeClasses = Boolean(checkInSuccess)
    ? " text-green-400   opacity-100!  pointer-events-auto"
    : "";

  const activeModalClasses = modalVisible
    ? " text-green-400   opacity-100!  pointer-events-auto -translate-y-1/2!"
    : "";

  useEffect(() => {
    if (checkInSuccess) {
      const { zoneState: zone, ticket } = checkInSuccess;
      setTicketInfo({
        ticket_id: ticket.id,
        checkin_at: new Date(ticket.checkinAt).toLocaleString(),
        user_type: ticket.type,
        gate_name: zone.name,
        zone_id: ticket.zoneId,
        gate_id: ticket.gateId,
      });

      if (videoRef.current) {
        videoRef.current.playbackRate = 4;
        videoRef.current.play();
        videoRef.current.onended = () => {
          setModalVisible(true);
        };
      }
    }

    window.onafterprint = () => {
      console.log("after print");
      setCheckInSuccess(null);
    };

    return () => {
      setModalVisible(false);
    };
  }, [Boolean(checkInSuccess)]);

  function handlePrint() {
    
    window.print();

    // window.onbeforeprint = () => {
    //   setCheckInSuccess(null);
    // }
  }

  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center pointer-events-none bg-black opacity-0 z-50 transition duration-300 ease-in-out" +
        activeClasses
      }
    >
      {/* black top shadow */}
      <div className="absolute  top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black"></div>

      {/* gate video */}
      <video
        ref={videoRef}
        src="/gate-open-animation.mp4"
        muted
        className="w-full h-full object-cover"
      ></video>

      {/* checkin ticket modal */}
      <div
        ref={modalRef}
        className={
          "absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-[100%] text-white text-center z-[51] transition   ease-in-out opacity-0 bg-[#1f1f1f] p-4 rounded duration-700 " +
          activeModalClasses
        }
      >
        <div className="print-wrapper">
          <div className="print">
            <h3>
              Checked In Successfully at:{" "}
              <span className=" text-sm bg-green-700 py-0.5 px-1 rounded">
                {checkInSuccess?.zoneState.name}
              </span>
            </h3>

            <hr className="my-4 border-gray-500" />

            <table className="text-start">
              <tbody>
                {Object.entries(ticketInfo ?? {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="pe-3">
                      <span className="text-gray-400 capitalize">
                        {key.replace("_", " ")}:{" "}
                      </span>
                    </td>
                    <td>
                      <span>{value}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          className="mt-5 bg-green-600 py-0.5 px-10 rounded noprint"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      {/* black bottom shadow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black"></div>
    </div>
  );
}

export default CheckInSuccess;
