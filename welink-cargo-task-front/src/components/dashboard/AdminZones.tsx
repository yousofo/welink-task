"use client";
import { IZone } from "@/lib/apiModels";
import { useMasterZones, useToggleZone } from "@/services/api";
import React from "react";

function AdminZones() {
  const { data } = useMasterZones();
  const { mutate } = useToggleZone();

  function handleToggleZone(open: boolean, zoneId: string) {
    mutate({ open, zoneId });
  }

  return (
    <table className="text-center text-sm  w-full overflow-hidden ">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Category Id</th>
          <th>Gate Ids</th>
          <th>Total Slots</th>
          <th>Occupied</th>
          <th>Free</th>
          <th>Reserved</th>
          <th>Visitors Slots</th>
          <th>Subscribers Slots</th>
          <th>Normal Rate</th>
          <th>Special Rate</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((zone: IZone) => (
          <tr className="hover:bg-gray-100/10" key={zone.id}>
            <td>{zone.id}</td>
            <td>{zone.name}</td>
            <td>{zone.categoryId}</td>
            <td>{zone.gateIds}</td>
            <td>{zone.totalSlots}</td>
            <td>{zone.occupied}</td>
            <td>{zone.free}</td>
            <td>{zone.reserved}</td>
            <td>{zone.availableForVisitors}</td>
            <td>{zone.availableForSubscribers}</td>
            <td>{zone.rateNormal}</td>
            <td>{zone.rateSpecial}</td>
            <td className="">
              <div onClick={() => handleToggleZone(!zone.open, zone.id)} className={"px-2 text-sm mx-auto py-0.5 rounded-lg border w-fit " + (zone.open ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500")}>
                {zone.open ? "Open" : "Closed"}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminZones;
