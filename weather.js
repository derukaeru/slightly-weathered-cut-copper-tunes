
async function fetch_weather(lat, lng) {
  var url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,wind_direction_10m`
  var weather_res = await fetch(url)
  var data = await weather_res.json();
}

function get_weather_values(data) {
  const { temperature, relative_humidity_2m, wind_speed_10m, surface_pressure, wind_direction_10m } = data.current

}
