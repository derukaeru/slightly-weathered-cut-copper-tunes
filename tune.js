/*
tempo = surface_pressure / 10
relative_humidity_2m, wind_direction_10m, wind_speed_10m, temperature_2m = notes
*/

var current_sequence = null
let playing_note_index = 0

function remap(value, imin, imax, omin, omax) {
  return ((value - imin) / (imax - imin)) * (omax - omin) + omin;
}

function create_tune(data) {
  playing_note_index = 0
  const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_speed_80m, wind_direction_10m, wind_direction_80m } = data.current

  const tempo = remap(temperature_2m, 20, 38, 60, 160)
  Tone.Transport.bpm.value = tempo

  const notes_num = [
    Math.round(remap(temperature_2m, 20, 38, 48, 84)),
    Math.round(remap(wind_speed_80m, 0, 40, 48, 84)),
    Math.round(remap(relative_humidity_2m, 0, 100, 48, 84)),
    Math.round(remap(wind_direction_10m, 0, 360, 48, 84)),
    Math.round(remap(wind_speed_80m, 0, 40, 48, 84)),
    Math.round(remap(wind_direction_80m, 0, 360, 48, 84)),
  ]
  render_bars(notes_num)

  const notes = notes_num.map(midi => Tone.Frequency(midi, "midi").toNote());
  const synth = new Tone.PolySynth().toDestination();

  if (current_sequence) {
      current_sequence.dispose();
    }

    current_sequence = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, "8n", time);
      highlight_bar(playing_note_index)
      playing_note_index = (playing_note_index + 1) % notes.length;
    }, notes, "8n").start(0);


  Tone.start().then(() => Tone.Transport.start());
  stop_button.style.display = "flex";
}

function end_tune() {
  if (current_sequence) {
    current_sequence.stop();
    current_sequence.dispose();
    current_sequence = null;
  }
  Tone.Transport.stop();
  stop_button.style.display = "none";
  remove_bars()
}
