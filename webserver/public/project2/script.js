window.onload = () => {
  //update title with time
  setInterval(updateTitle, 1000);

  //update sun position with time
  setInterval(moveSun, 1000);

  //change bg color
  const bgRs = [27, 86, 16, 7];
  const bgGs = [112, 215, 4, 1];
  const bgBs = [223, 255, 64, 22];
  setInterval(() => changeColor(bgRs, bgGs, bgBs), 1000);

  //start ocean waves
  var audio = document.getElementById('waves');
  
  //error handling stuff
  audio.play().catch(function(error) {
    console.log("press the button to play");
  });

  // //change ground color
  // const fgRs = [114, 116, 72, 17];
  // const fgGs = [100, 92, 56, 17];
  // const fgBs = [97, 87, 48, 17];

  // setInterval(changeColor(fgRs, fgGs, fgBs), 1000);

  //setInterval(minuteTick, 10);
};

//for debugging although it literally doesn't work since changeBgColor depends on hour too and i need an additional clamp() to make this work LOL
// function minuteTick(){
//   if (minute >= 1440) minute = 0;
//   else minute+=1;

//   return minute;
// }

//toggles audio
function toggleAudio() {
  var audio = document.getElementById('waves');
  var button = document.getElementById('toggle');

  if (audio.paused) {
    audio.play();
    button.textContent = "quiet, please";
  } else {
    audio.pause();
    button.textContent = "hear the sea";
  }
}

//toggles the what is happening button
function explain() {
  var button = document.getElementById('info');

  if (button.textContent == "what is happening") {
    button.textContent = "this landscape changes according to the time of day. colors shift from day to night. the sun inches forward in the sky";
  } else {
    button.textContent = "what is happening";
  }
}

//updates title with time
function updateTitle() {
  const date = new Date();
  const time = date.toLocaleTimeString(); // Gets the current time in a localized format

  const titleText = `it's ${time} on earth`;

  document.title = titleText;
}

//moves sun with time
function moveSun() {
  //make new date element
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes() + hour * 60; //so minute actually represents the minute of the day, from 0 to 23*60+59

  x = Math.floor(mapRange(minute, 0, 1440, 0, window.innerWidth));

  document.getElementById("moonsun").style.left = x;
  document.getElementById("moonsunlight").style.left = x;
}

//changes colors of elements with time
function changeColor(rs, gs, bs) {
  //make new date element
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes() + hour * 60; //so minute actually represents the minute of the day, from 0 to 23*60+59
  //const second = date.getSeconds() + (minute*60);   //just in case i ever wanna make the shifting happen more
  let bgColor;

  //these numbers represent the rgb values at key "border" times: 12pm, 6pm, 12am, 6am
  (r1 = rs[0]), (r2 = rs[1]), (r3 = rs[2]), (r4 = rs[3]);
  (g1 = gs[0]), (g2 = gs[1]), (g3 = gs[2]), (g4 = gs[3]);
  (b1 = bs[0]), (b2 = bs[1]), (b3 = bs[2]), (b4 = bs[3]);

  let r, g, b;

  //set bg color based on time in 6 hour intervals
  //within each interval, the minute is mapped to a color
  if (hour >= 6 && hour < 12) {
    //morning (6 am to 12 pm)
    //bg color = "rgb(27, 112, 223)";
    //fg color = "rgb(114, 100, 97)"
    //min minute = 6*60 = 360, max minute = 11*60+59 = 719
    r = Math.floor(mapRange(minute, 360, 719, r1, r2));
    g = Math.floor(mapRange(minute, 360, 719, g1, g2));
    b = Math.floor(mapRange(minute, 360, 719, b1, b2));
  } else if (hour >= 12 && hour < 18) {
    //afternoon (12 pm to 6 pm)
    //bg color = "rgb(86, 215, 255)";
    //fg color = "rgb(116, 92, 87)"
    //min minute = 12x60 = 720, max minute = 17*60+59 = 1079

    r = Math.floor(mapRange(minute, 720, 1079, r2, r3));
    g = Math.floor(mapRange(minute, 720, 1079, g2, g3));
    b = Math.floor(mapRange(minute, 720, 1079, b2, b3));
  } else if (hour >= 18 && hour < 24) {
    //evening (6 pm to 12 am)
    //bg color = "rgb(16, 4, 64)";
    //fg color = "rgb(72, 56, 48)"
    //min minute = 18x60 = 1080, max minute = 23*60+59 = 1439

    r = Math.floor(mapRange(minute, 1080, 1439, r3, r4));
    g = Math.floor(mapRange(minute, 1080, 1439, g3, g4));
    b = Math.floor(mapRange(minute, 1080, 1439, b3, b4));
  } else {
    //night (12 am to 6 am)
    //bg color = "rgb(7, 1, 22)";
    //fg color = "rgb(17, 17, 17)";
    //min minute = 0x60 = 0, max minute = 5*60+59 = 359

    r = Math.floor(mapRange(minute, 0, 359, r4, r1));
    g = Math.floor(mapRange(minute, 0, 359, g4, g1));
    b = Math.floor(mapRange(minute, 0, 359, b4, b1));
  }

  bgColor = `rgb(${r}, ${g}, ${b})`;

  // apply bg color
  // for all the other divs i'm basically putting a filter on it that is set to the bg color, just color-multiplied and overlayed on top
  document.body.style.backgroundColor = bgColor;
  document.getElementById("ocean").style.backgroundColor = bgColor;
  document.getElementById("groundlight").style.backgroundColor = bgColor;
  document.getElementById("moonsunlight").style.backgroundColor = bgColor;
}

function mapRange(num, inMin, inMax, outMin, outMax) {
  x = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  return x;
}

// function time() {
//     const hour = new Date().getHours();
//     return hour;

//   //console.log(seconds + " seconds has passed");
//   //seconds++;
//   //console.log(date.toLocaleTimeString());

//     // let allSpans = document.getElementsByClassName("text-body");
//     // for (let i=0; i<allSpans.length; i++){
//     //     allSpans[i].textContent = date.toLocaleTimeString()
//     // }
// }
