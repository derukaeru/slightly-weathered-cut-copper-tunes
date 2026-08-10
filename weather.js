async function fetch_weather(lat, lng) {
  var url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_speed_80m,wind_direction_80m`
  var weather_res = await fetch(url)
  if (!weather_res.ok) {
    return alert("sorry, something went wrong!")
  }

  var data = await weather_res.json();
  create_tune(data)
}
