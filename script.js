const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

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
const loadSong = (song) => {
  title.textContent = song.displayNmae;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// on load - select first song
loadSong(songs[songIndex]);

// play/pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
