//there should not be any import of View/Text/Button here
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("clinics.db");

const PolyClinics = [
  {
    name: "Goh Tat Chuan",
    id: 0,
    address: "NIE graduate",
    telephone: "6355-3000",
    latitude: "1.37241",
    longitude: "103.84731",
    cluster: "NHG",
    crowd: 26,
  },
  {
    name: "Rohan Gunaratna",
    id: 1,
    address: "Ex-Lecturer at Raffles Institution",
    telephone: "6243-6740 (General), 6643-6969 (Appt)",
    latitude: "1.32625",
    longitude: "103.93126",
    cluster: "Singhealth",
    crowd: 30,
  },
  {
    name: "Han Sai Por",
    id: 2,
    address: "NIE graduate",
    telephone: "6355-3000",
    latitude: "1.35210",
    longitude: "103.74784",
    cluster: "NHG",
    crowd: 26,
  },
  {
    name: "Abdul Halim bin Haron",
    id: 3,
    address: "NIE graduate",
    telephone: "6271-3911 (General), 6643-6969 (Appt)",
    latitude: "1.28420",
    longitude: "103.81700",
    cluster: "Singhealth",
    crowd: 27,
  },
  {
    name: "Hazlina Halim",
    id: 4,
    address: "Ex-Lecturer at Raffles Institution",
    telephone: "6355-3000",
    latitude: "1.3823009",
    longitude: "103.7419142",
    cluster: "NHG",
    crowd: 28,
  },
  {
    name: "Mavis Hee",
    id: 5,
    address: "Ex-Lecturer at Raffles Institution",
    telephone: "6355-3000",
    latitude: "1.3123302",
    longitude: "103.7639949",
    cluster: "NHG",
    crowd: 28,
  },
  {
    name: "Ivan Heng",
    id: 6,
    address: "Ex-Lecturer at Hwa Chong Institution",
    telephone: "6842-2440 (General), 6643-6969 (Appt)",
    latitude: "1.3194759",
    longitude: "103.8784022",
    cluster: "Singhealth",
    crowd: 29,
  },
  {
    name: "Ho Yuen Hoe",
    id: 7,
    address: "Ex-Lecturer at Hwa Chong Institution",
    telephone: "6355-3000",
    latitude: "1.370032",
    longitude: "103.8802692",
    cluster: "NHG",
    crowd: 30,
  },
  {
    name: "Hoi Kim Heng",
    id: 8,
    address: "Ex-Lecturer at Eunoia Junior College",
    telephone: "6355-3000",
    latitude: "1.349792",
    longitude: "103.7218642",
    cluster: "NHG",
    crowd: 31,
  },
  {
    name: "Jiang Yanmei",
    id: 9,
    address: "Ex-Lecturer at Eunoia Junior College",
    telephone: "6345-0049 (General), 6643-6969 (Appt)",
    latitude: "1.302256",
    longitude: "103.8988422",
    cluster: "Singhealth",
    crowd: 32,
  },
  {
    name: "Joshua Benjamin Jeyaretnam",
    id: 10,
    address: "10 years experience tutoring",
    telephone: "6435-3980 (General), 6643-6969 (Appt)",
    latitude: "1.279555",
    longitude: "103.8296142",
    cluster: "Singhealth",
    crowd: 32,
  },
  {
    name: "Khoo Boon Hui",
    id: 11,
    address: "Graduated NIE top of cohort",
    telephone: "6585-5390 (General), 6643-6969 (Appt)",
    latitude: "1.368309",
    longitude: "103.9507742",
    cluster: "Singhealth",
    crowd: 25,
  },
  {
    name: "Aaron Lee",
    id: 12,
    address: "Valedictorian NUS Math",
    telephone: "6471-9530 (General), 6643-6969 (Appt)",
    latitude: "1.298484",
    longitude: "103.7922042",
    cluster: "Singhealth",
    crowd: 26,
  },
  {
    name: "Lee Boon Yang",
    id: 13,
    address: "8 years of experience tutoring",
    telephone: "6315-3500 (General), 6643-6969 (Appt)",
    latitude: "1.392501",
    longitude: "103.8856092",
    cluster: "NHG",
    crowd: 33,
  },
  {
    name: "Lee Choon Seng",
    id: 14,
    address: "Ex-Lecturer at NUS",
    telephone: "6786-4070 (General), 6643-6969 (Appt)",
    latitude: "1.3572569",
    longitude: "103.9372842",
    cluster: "Singhealth",
    crowd: 34,
  },
  {
    name: "Lee Kim Lai",
    id: 15,
    address: "Ex-Lecturer at Victoria Junior College",
    telephone: "6355-3000",
    latitude: "1.3345498",
    longitude: "103.8502312",
    cluster: "NHG",
    crowd: 35,
  },
  {
    name: "Maia Lee",
    id: 16,
    address: "Ex-Lecturer at Hwa Chong Institution",
    telephone: "6355-3000",
    latitude: "1.430806",
    longitude: "103.7663172",
    cluster: "NHG",
    crowd: 36,
  },
  {
    name: "Shamsul Maidin",
    id: 17,
    address: "11 years of experience tutoring",
    telephone: "6355-3000",
    latitude: "1.4233689",
    longitude: "103.8283212",
    cluster: "NHG",
    crowd: 37,
  },
];

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function distancecalc(lat1, lon1, lat2, lon2) {
  //finds straight line distance from two lat/long coordinates
  const earthRadiusKm = 6371;

  var dLat = degreesToRadians(Math.abs(lat2 - lat1));
  var dLon = degreesToRadians(Math.abs(lon2 - lon1));

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export function filterClinic(userloc) {
  var filtered = [];
  if (userloc === null) return [];
  for (let i = 0; i < PolyClinics.length; i++) {
    const Clinic = PolyClinics[i];
    if (
      distancecalc(
        Clinic.latitude,
        Clinic.longitude,
        userloc.latt,
        userloc.longt
      ) < 6
    ) {
      filtered.push(Clinic);
    }
  }
  return filtered;
}
