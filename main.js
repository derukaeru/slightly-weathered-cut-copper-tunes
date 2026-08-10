const map = L.map("map").setView([12.8797, 121.7740], 6)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

let marker;
map.on("click", (e) => {
  const { lat, lng } = e.latlng;

  if (marker) marker.remove();
  marker = L.marker([lat, lng]).addTo(map);

  fetch_weather(lat, lng)
})
