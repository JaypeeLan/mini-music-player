const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeELem = document.getElementById("current-time");
const durationELem = document.getElementById("duration");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// songs
const songs = [
  {
    name: "jacinto-1",
    displayNmae: "Electric Chill Machine",
    artist: "John Doe",
  },
  {
    name: "jacinto-2",
    displayNmae: "Seven Nation Army",
    artist: "Jacinto Designe",
  },
  {
    name: "jacinto-3",
    displayNmae: "hello world",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayNmae: "Front Row (remix)",
    artist: "John Doe",
  },
];

// check if playing
let isPlaying = false;

// play func
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
};

// pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");

  music.pause();
};

// -------------------
let songIndex = 0;

//prev song
const prevSong = () => {
  songIndex--;
  songIndex < 0 ? (songIndex = songs.length - 1) : loadSong(songs[songIndex]);
  playSong();
};

// next song
const nextSong = () => {
  songIndex++;
  songIndex > songs.length - 1 ? (songIndex = 0) : loadSong(songs[songIndex]);

  playSong();
};

// ---------------------------------
// update DOM while clicking next/previous
const loadSong = (song) => {
  title.textContent = song.displayNmae;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

//?  on page load - select first song
loadSong(songs[songIndex]);

// update progress bar and time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;

    // calc duration time in minutes
    const durationMins = Math.floor(duration / 60);

    // calc duration secs
    let durationSecs = Math.floor(duration % 60);

    durationSecs < 10 ? (durationSecs = `0${durationSecs}`) : "";

    //  Delay the duration elem to avaoid showing NaN
    if (durationSecs) {
      durationELem.textContent = `${durationMins}:${durationSecs}`;
    }

    // --------------------------------
    // calc duration time in minutes
    const currentMins = Math.floor(currentTime / 60);

    // calc current secs
    let currentSecs = Math.floor(currentTime % 60);

    if (currentSecs) {
      currentTimeELem.textContent = `${currentMins}:${currentSecs}`;
    }
  }
};

// play/pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// ? event listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
