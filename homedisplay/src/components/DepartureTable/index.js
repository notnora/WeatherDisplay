import React from "react";
import { Heading2 } from "@entur/typography";
import {
  HeaderCell,
  Table,
  TableBody,
  TableHead,
  TableRow
} from "@entur/table";
import { DepartureRow } from "../DepartureRow";
import "@entur/typography/dist/styles.css";

export const DepartureTable = props => {
  return (
    <div>
      <Heading2>Arkitekt Rivertz plass</Heading2>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>Linje</HeaderCell>
            <HeaderCell>Destinasjon</HeaderCell>
            <HeaderCell>Tid</HeaderCell>
            <HeaderCell>Transport</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.departures.map(departure => {
            return (
              <DepartureRow
                linjenummer={departure.line.publicCode}
                destinationDisplay={departure.destinationDisplay.frontText}
                departureLabel={departure.departureLabel}
                transport={departure.line.transportMode}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
