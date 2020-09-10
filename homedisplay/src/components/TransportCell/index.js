import React from "react";
import {
  BusIcon,
  PlaneIcon,
  BicycleIcon,
  FerryIcon,
  SubwayIcon,
  TrainIcon,
  ScooterIcon,
  TramIcon,
  SuitcaseIcon,
  WalkingIcon
} from "@entur/icons/dist";

export const TransportCell = props => {
  switch (props.transport) {
    case "bus":
      return <BusIcon />;
    case "air":
      return <PlaneIcon />;
    case "bike":
      return <BicycleIcon />;
    case "ferry":
      return <FerryIcon />;
    case "metro":
      return <SubwayIcon />;
    case "plane":
      return <PlaneIcon />;
    case "scooter":
      return <ScooterIcon />;
    case "train":
      return <TrainIcon />;
    case "tram":
      return <TramIcon />;
    case "foot":
      return <WalkingIcon />;
    default:
      return <SuitcaseIcon />;
  }
};
export default TransportCell;
