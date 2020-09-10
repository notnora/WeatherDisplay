import React from "react";
import { TableRow } from "@entur/table";
import { DataCell } from "@entur/table";
import "@entur/table/dist/styles.css";
import "@entur/typography/dist/styles.css";
import "@entur/icons/dist/styles.css";
import TransportCell from "../TransportCell";

export const DepartureRow = props => {
  let transport = props.transport;

  return (
    <TableRow align="left">
      <DataCell>{props.linjenummer}</DataCell>
      <DataCell>{props.destinationDisplay}</DataCell>
      <DataCell>{props.departureLabel}</DataCell>
      <DataCell>
        <TransportCell transport={transport} />
      </DataCell>
    </TableRow>
  );
};
export default DepartureRow;
