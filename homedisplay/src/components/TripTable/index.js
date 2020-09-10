import React from "react";
import { Heading2, Heading3 } from "@entur/typography";
import { HeaderCell, Table, TableBody, TableHead } from "@entur/table";
import "@entur/typography/dist/styles.css";
import TripRow from "../TripRow";
import { toTimeString } from "../../utils/Departures";

export const TripTable = props => {
  let trip = props.trip;
  let tripName = props.tripName;
  if (trip.length === 0) {
    return null;
  }
  trip = trip[0];
  let legs = trip.legs;
  return (
    <div>
      <Heading2>{tripName}</Heading2>
      <Heading3>
        {toTimeString(new Date(trip.startTime))} -{" "}
        {toTimeString(new Date(trip.endTime))}
      </Heading3>
      <Table>
        <TableHead>
          <HeaderCell>Starttid</HeaderCell>
          <HeaderCell>Sluttid</HeaderCell>
          <HeaderCell>Linje</HeaderCell>
          <HeaderCell>Transport</HeaderCell>
          <HeaderCell>Fra</HeaderCell>
          <HeaderCell>Til</HeaderCell>
        </TableHead>
        <TableBody>
          {legs.map(tripLeg => {
            return <TripRow leg={tripLeg} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};
