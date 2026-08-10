var tune_visualizer = document.getElementById("tune-visualizer")
var last_active_bar

const map = L.map("map").setView([0, 0], 1)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

let marker;
map.on("click", (e) => {
  const { lat, lng } = e.latlng.wrap();

  if (marker) marker.remove();
  marker = L.marker([lat, lng]).addTo(map);

  fetch_weather(lat, lng)
})

function render_bars(notes) {
  remove_bars()

  notes.forEach((n, i) => {
    let bar = document.createElement("div")
    bar.classList.add("bar")

    bar.dataset.index = i

    bar.style.height = `${remap(n, 48, 84, 8, 56)}px`
    tune_visualizer.appendChild(bar)
  })
}

function highlight_bar(index) {
  if (last_active_bar) {
    last_active_bar.classList.remove("bar")
  }

  let next_bar = document.querySelector(`.bar[data-index="${index}"]`)
  if(next_bar) {
    next_bar.classList.add("active")
    last_active_bar = next_bar
  }
}

function remove_bars() {
  tune_visualizer.innerHTML = "";
}
