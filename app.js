"use strict";
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
// -------------------
let songIndex = 1;
// check if playing
let isPlaying = false;
// songs
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "John Doe",
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army",
        artist: "Jacinto Designe",
    },
    {
        name: "jacinto-3",
        displayName: "hello world",
        artist: "Jacinto Design",
    },
    {
        name: "metric-1",
        displayName: "Front Row (remix)",
        artist: "John Doe",
    },
];
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
// ---------------------------------
// update DOM while clicking next/previous
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};
//prev song
const prevSong = () => {
    songIndex--;
    // go to the last song in the array when we try to go to the previous song from the first song
    songIndex < 0 ? (songIndex = songs.length - 1) : loadSong(songs[songIndex]);
    playSong();
};
// next song
const nextSong = () => {
    songIndex++;
    songIndex > songs.length - 1 ? (songIndex = 0) : loadSong(songs[songIndex]);
    playSong();
};
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
function setProgressBar(e) {
    // width of the curent playing song progress bar
    const width = this.clientWidth;
    // position on the progress bar that was click
    const clickX = e.offsetX;
    // ------------------------
    // duration of the song currently playing
    const { duration } = music;
    // ? clickX / width gives the positon that was click on the progress bar relative to the width
    // *  (clickX / width * duration) calculates the position that was clicked relative to the duration of the current song
    music.currentTime = (clickX / width) * duration;
}
// ------------------
progressContainer.addEventListener("click", setProgressBar);
// play/pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
// ? event listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
// auto jump to next song at the end of the current song
music.addEventListener("ended", nextSong);
