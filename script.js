// Making a map and tiles
// Setting a higher initial zoom to make effect more obvious
let longitude;
const mymap = L.map("issMap").setView([0, 0], 4);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "ChromeISS.png",
  iconSize: [289, 193],
  iconAnchor: [144, 96],
});
let marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const {
    latitude,
    longitude,
    name,
    id,
    altitude,
    velocity,
    visibility,
    footprint,
    timestamp,
    daynum,
    solar_lat,
    solar_lon,
  } = data;

  // Always set the view to current lat lon and zoom!
  mymap.setView([latitude, longitude], mymap.getZoom());
  marker.setLatLng([latitude, longitude]);

  document.getElementById("lat").textContent = latitude.toFixed(6);
  document.getElementById("lon").textContent = longitude.toFixed(6);
  document.getElementById("nam").textContent = name;
  document.getElementById("IDnum").textContent = id;
  document.getElementById("alt").textContent = altitude.toFixed(3);
  document.getElementById("vel").textContent = velocity.toFixed(1);
  document.getElementById("vis").textContent = visibility;
  document.getElementById("fot").textContent = footprint.toFixed(2);
  document.getElementById("tim").textContent = timestamp;
  document.getElementById("day").textContent = daynum.toFixed(2);
  document.getElementById("sol").textContent = solar_lat.toFixed(4);
  document.getElementById("solon").textContent = solar_lon.toFixed(4);

  // console.log(((latitude - Math.floor(latitude)) * 100).toFixed(0));
  // console.log(latitude);

  var her = ((longitude - Math.floor(longitude)) * 100).toFixed(0);
  console.log(longitude);
}

getISS();
setInterval(getISS, 1000);
