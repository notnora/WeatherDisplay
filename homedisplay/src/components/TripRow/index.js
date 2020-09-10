import React from "react";
import { DataCell, TableRow } from "@entur/table";
import TransportCell from "../TransportCell";
import { toTimeString } from "../../utils/Departures";

export const TripRow = props => {
  let leg = props.leg;
  let linenr = leg.mode === "foot" ? "-" : leg.line.publicCode;

  return (
    <TableRow align="left">
      <DataCell>{toTimeString(new Date(leg.expectedStartTime))}</DataCell>
      <DataCell>{toTimeString(new Date(leg.expectedEndTime))}</DataCell>
      <DataCell>{linenr}</DataCell>
      <DataCell>
        <TransportCell transport={leg.mode} />
      </DataCell>
      <DataCell>{leg.fromPlace.name}</DataCell>
      <DataCell>{leg.toPlace.name}</DataCell>
    </TableRow>
  );
};

export default TripRow;
