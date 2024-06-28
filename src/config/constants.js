export const doctorCategories = [
  {
    id: 1,
    name: "Outpatient Radiology / Image centers",
    value: "Outpatient Radiology,Imaging Centers",
    color: "rgb(251,201,43)",
  },
  {
    id: 2,
    name: "Orthopedic doctors and surgeons",
    value: "Orthopedic Surgery",
    color: "rgb(243,125,73)",
  },
  {
    id: 3,
    name: "Chiropractors",
    value: "Chiropractor",
    color: "rgb(254,31,86)",
  },
  {
    id: 4,
    name: "Pain Management",
    value: "Pain Management",
    color: "rgb(205,41, 162)",
  },
  {
    id: 5,
    name: "Primary Care / General practitioner / Internal Medicine",
    value: "Primary Care,General Practitioner,Internal Medicine",
    color: "rgb(152,44,200)",
  },
  {
    id: 6,
    name: "Neurology",
    value: "Neurology",
    color: "rgb(111,48,243)",
  },
  {
    id: 7,
    name: "Oncologist",
    value: "Oncologist",
    color: "rgb(75, 105, 246)",
  },
];

export const mapCenter = {
  lat: 40.75224,
  lng: -74.05364,
};

export const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export const rad = (ang) => {
  return (ang * Math.PI) / 180;
};

export const getDistance = (p1Lat, p1Lng, p2Lat, p2Lng) => {
  const R = 3958.756; // Earth's radius
  let dLat = rad(p2Lat - p1Lat);
  let dLong = rad(p2Lng - p1Lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1Lat)) *
      Math.cos(rad(p2Lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3); // returns the distance in meter
};
