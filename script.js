let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("master_play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.querySelector(".gifimg");
let playingSongText = document.querySelector(".playing_song");

let songs = [
  { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Different Heaven - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Janji - Heroes Tonight 2", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "DEAF KEV - Invincible 2", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Warriyo - Mortals 2", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Janji - Heroes Tonight 3", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Different Heaven - My Heart 2", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
    playingSongText.textContent = "Warriyo - Mortals";
    playingSongText.style.marginTop = "15px";
   playingSongText.style.marginLeft = "10px";
  } 
  else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
    playingSongText.textContent = ""  
  }
});

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

let songItems = document.querySelectorAll(".song-name");

songItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    playSongByIndex(index);
  });
});

function playSongByIndex(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  gif.style.opacity = 1;
  playingSongText.textContent = songs[songIndex].songName;
  playingSongText.style.marginTop = "15px";
  playingSongText.style.marginLeft = "10px";

}

let isLooping = false;
let isShuffling = false;

let shuffleBtn = document.getElementById("shuffle_btn");
let loopBtn = document.getElementById("loop_btn");

shuffleBtn.addEventListener("click", () => {
  isShuffling = !isShuffling;
  shuffleBtn.classList.toggle("active");
});

loopBtn.addEventListener("click", () => {
  isLooping = !isLooping;
  loopBtn.classList.toggle("active");
});

audioElement.addEventListener("ended", () => {
  if (isLooping) {
    playSongByIndex(songIndex);
  } else if (isShuffling) {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (randomIndex === songIndex) {
    randomIndex = Math.floor(Math.random() * songs.length);
}
  } else {
    if (songIndex < songs.length - 1) {
      playSongByIndex(songIndex + 1);
    } else {
      
      masterPlay.classList.remove("fa-pause");
      masterPlay.classList.add("fa-play");
      gif.style.opacity = 0;
    }
  }
});
let prevBtn = document.getElementById("prev_btn");
let nextBtn = document.getElementById("next_btn");

nextBtn.addEventListener("click", () => {
  if (isShuffling) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === songIndex);
    playSongByIndex(randomIndex);
  } else {
    if (songIndex < songs.length - 1) {
      playSongByIndex(songIndex + 1);
    } else {
      playSongByIndex(0);
    }
  }
});

prevBtn.addEventListener("click", () => {
  if (audioElement.currentTime > 3 || songIndex === 0) {
    audioElement.currentTime = 0;
  } else {
    playSongByIndex(songIndex - 1);
  }
});

document.body.addEventListener('keydown', (e) => {
  
});

document.body.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    masterPlay.click();
  } else if (e.code === "ArrowRight" || e.code === "ArrowUp") {
    e.preventDefault();
    nextBtn.click();
  } else if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
    e.preventDefault();
    prevBtn.click();
  }
});

loopBtn.addEventListener("dblclick", () => {
  isLooping = !isLooping;

  if (isLooping) {
    loopBtn.style.color = "red";
  } else {
    loopBtn.style.color = "";
  }
});
