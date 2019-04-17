function filterDots(value) {
  
  value = value.replace('1/32.', '1/32 + 1/64')
               .replace('1/16.', '1/16 + 1/32')
               .replace('1/8.', '1/8 + 1/16')
               .replace('1/4.', '1/4 + 1/8')
               .replace('1/2.', '1/2 + 1/4');

  return value;
  
};

function filterValue(value) {
 
  if(value == 0) return value;
  
  value = value.replace('1/64', '64n')
               .replace('1/32', '32n')
               .replace('1/16', '16n')
               .replace('1/8', '8n')
               .replace('1/4', '4n')
               .replace('1/2', '2n');
  
  return value;
  
}

function filterTime(time) {
  
  time = time.replace('m', '');
  time = time.split(' + ');
  
  var sum = time.reduce(function(total, element){
    return math.add(math.fraction(total), math.fraction(element));
  }, 1);

  var str = [];

  while(sum.d != 1) {
    if(sum.n % 2 != 0) {
      str.push('1/' + sum.d);
      sum.n = (sum.n - 1) / 2;
    } else {
      sum.n = sum.n / 2;
    }
    sum.d = sum.d / 2;
  }

  if(sum.n > 1) str.unshift(sum.n-1 + 'm');

  return str.join(' + ');
  
}

function filterNotes(notes) {
  
  var timeline = 0;
  var part = {notes:[], length:''};
  var last = notes.length - 1;
  notes.forEach(function(note, index) {
    note[1] = filterDots(note[1]);
    note[2] = (index > 0) ? filterTime(timeline) : 0;
    timeline = (timeline) ? timeline + ' + ' + note[1] : note[1];
    part.notes.push({"name": filterValue(note[0]), "duration": note[1], "time": filterValue(note[2]), "velocity": 1});
  })  
  
  part.length = filterValue(filterTime(notes[last][2] + ' + ' + notes[last][1]));
  
  return part;
}

var pulseOptions = {
  oscillator:{
    type: "pulse"
  },
  envelope:{
    release: 0.07
  }
};

var triangleOptions = {
  oscillator:{
    type: "triangle"
  },
  envelope:{
    release: 0.07
  }
};

Tone.Transport.bpm.value = 100;

var pulsePart = new Tone.Part();
var trianglePart = new Tone.Part();

ONEVENT = () => {
// triangle
  var PacmanBass = [
    ['B1', '1/8.'], ['B2', '1/16'], ['B1', '1/8.'], ['B2', '1/16'],
    ['C2', '1/8.'], ['C3', '1/16'], ['C2', '1/8.'], ['C3', '1/16'],
    ['B1', '1/8.'], ['B2', '1/16'], ['B1', '1/8.'], ['B2', '1/16'],
    ['F#2', '1/8'], ['Ab2', '1/8'], ['Bb2', '1/8'], ['B2', '1/8'],
  ];

  // pulse
  var PacmanMelody = [
    ['B4', '1/16'], ['B5', '1/16'], ['F#5', '1/16'], ['Eb5', '1/16'], 
    ['B5', '1/32'], ['F#5', '1/16.'], ['Eb5', '1/8'],
    ['C5', '1/16'], ['C6', '1/16'], ['G5', '1/16'], ['E5', '1/16'], 
    ['C6', '1/32'], ['G5', '1/16.'], ['E5', '1/8'],
    
    ['B4', '1/16'], ['B5', '1/16'], ['F#5', '1/16'], ['Eb5', '1/16'],
    ['B5', '1/32'], ['F#5', '1/16.'], ['Eb5', '1/8'],
    
    ['Eb5', '1/32'], ['E5', '1/32'], ['F5', '1/16'],
    ['F5', '1/32'], ['F#5', '1/32'], ['G5', '1/16'],
    ['G5', '1/32'], ['Ab5', '1/32'], ['A5', '1/16'], ['B5', '1/8'],
  ];

  var pulseSynth = new Tone.Synth(pulseOptions).toMaster();
  var triangleSynth = new Tone.Synth(triangleOptions).toMaster();
  
  pulsePart.stop(0);
  trianglePart.stop(0);
  Tone.Transport.stop();

  pulsePart.removeAll();
  trianglePart.removeAll();

  pulsePart = new Tone.Part((time, note) => {
    console.log(time, note);
    pulseSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
  }, filterNotes(PacmanMelody).notes);

  trianglePart = new Tone.Part((time, note) => {
    triangleSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
  }, filterNotes(PacmanBass).notes);

  Tone.Transport.start('+0.1', 0);

  pulsePart.start(0);
  trianglePart.start(0);

  Tone.Transport.stop('+2m');
}