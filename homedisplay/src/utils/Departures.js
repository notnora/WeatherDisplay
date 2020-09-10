import EnturService, { convertFeatureToLocation } from "@entur/sdk";

export function toTimeString(date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

function minutesDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(timeDiff / (1000 * 60));
}

export async function getTrip(from, to) {
  const service = new EnturService({ clientName: "personal-homedisplay" });
  const [fromFeature] = await service.getFeatures(from);
  const [toFeature] = await service.getFeatures(to);

  if (!fromFeature || !toFeature) {
    return;
  }
  const tripPatterns = await service.getTripPatterns({
    searchDate: new Date(),
    from: convertFeatureToLocation(fromFeature),
    to: convertFeatureToLocation(toFeature),
    limit: 1
  });
  return tripPatterns;
}

export async function getDepartures(stopPlaceID) {
  const service = new EnturService({ clientName: "personal-homedisplay" });
  const now = new Date();
  const departureList = [];

  const departures = await service.getStopPlaceDepartures(stopPlaceID, {
    departures: 5
  });
  departures.forEach(departure => {
    const {
      expectedDepartureTime,
      destinationDisplay,
      serviceJourney
    } = departure; // Info fra avgangen
    const { line } = serviceJourney.journeyPattern; // Linjenummer
    const departureTime = new Date(expectedDepartureTime); // Avgangstid for avgangen
    const minDiff = minutesDifference(now, departureTime); // Beregning av minutter.
    const departureLabel =
      minDiff < 15 ? `${minDiff} min` : toTimeString(departureTime);
    departureList.push({ departureLabel, line, destinationDisplay });
  });
  return departureList;
}
