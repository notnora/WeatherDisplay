import React from "react";
import { getDepartures } from "../utils/Departures";
import "@entur/table/dist/styles.css";
import "@entur/expand/dist/styles.css";
import { getTrip } from "../utils/Departures";
import { DepartureTable } from "./DepartureTable";
import { TripTable } from "./TripTable";
import { ExpandableText } from "@entur/expand";

export const KollektivDisplay = props => {
  const NSR = "NSR:StopPlace:6355";
  const [departures, setDepartures] = React.useState([]);
  const [ifiTrip, setIfiTrip] = React.useState([]);
  const [ccVestTrip, setCCVestTrip] = React.useState([]);
  const [simulaTrip, setSimulaTrip] = React.useState([]);
  const [asjordetTrip, setAsjordetTrip] = React.useState([]);
  const [asstubbenTrip, setAsstubbenTrip] = React.useState([]);
  getDepartures(NSR).then(res => {
    if (departures.length === 0) {
      setDepartures(res);
    }
  });
  getTrip("Lovisenberggata 15J, Oslo", "Gaustadalleen 23, Oslo").then(res => {
    if (ifiTrip.length === 0) {
      setIfiTrip(res);
    }
  });
  getTrip("Lovisenberggata 15J, Oslo", "Lilleakerveien 16, Oslo").then(res => {
    if (ccVestTrip.length === 0) {
      setCCVestTrip(res);
    }
  });
  getTrip("Lovisenberggata 15J, Oslo", "Martin Linges vei 25, Oslo").then(
    res => {
      if (simulaTrip.length === 0) {
        setSimulaTrip(res);
      }
    }
  );
  getTrip("Lovisenberggata 15J, Oslo", "Åsjordet 1, Oslo").then(res => {
    if (asjordetTrip.length === 0) {
      setAsjordetTrip(res);
    }
  });
  getTrip("Lovisenberggata 15J, Oslo", "Åsstubben 14, Oslo").then(res => {
    if (asstubbenTrip.length === 0) {
      setAsstubbenTrip(res);
    }
  });

  return (
    <div>
      <DepartureTable departures={departures} />
      <ExpandableText title="IFI">
        <TripTable tripName="IFI" trip={ifiTrip} />
      </ExpandableText>
      <ExpandableText title="CC Vest">
        <TripTable tripName="Til CC Vest" trip={ccVestTrip} />
      </ExpandableText>
      <ExpandableText title="Simula">
        <TripTable tripName="Til Simula" trip={simulaTrip} />
      </ExpandableText>
      <ExpandableText title="Åsjordet">
        <TripTable tripName="Til Åsjordet" trip={asjordetTrip} />
      </ExpandableText>
      <ExpandableText title="Åsstubben">
        <TripTable tripName="Til Åsstubben" trip={asstubbenTrip} />
      </ExpandableText>
    </div>
  );
};
export default KollektivDisplay;
