const tracks = [
    {
        name: 'evergreen',
        author: 'Richy Mitch & The Coal Miners',
        src: 'assets/audio/evergreen.mp3',
        img: 'assets/img/evergreen.jpg',
        color: 'yellow',
        pattern: 'assets/img/hopepattern.png'
    },
    {
        name: 'loser club',
        author: 'wifiskeleton',
        src: 'assets/audio/loserclub.mp3',
        img: 'assets/img/loserclub.png',
        color: 'grey',
        pattern: 'assets/img/loserpattern.png'
    }
];

// DOM элементы
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volume');

const albumArt = document.querySelector('.album-art img');
const trackName = document.querySelector('.player-info h3');
const trackAuthor = document.querySelector('.player-info p');
const musicPlayer = document.querySelector('.music-player');

const sphere1 = document.getElementById('sphere1');
const sphere2 = document.getElementById('sphere2');

let currentTrackIndex = 0;
let isPlaying = false;

// === ФУНКЦИЯ СМЕНЫ ФОНА ПЛЕЕРА ===
function changePlayerColor(color) {
    musicPlayer.style.background = `rgba(${color === 'yellow' ? '255, 255, 0' : '128, 128, 128'}, 0.1)`;
    musicPlayer.style.borderColor = color;
    musicPlayer.style.boxShadow = `0 0 50px ${color}20`; // прозрачное свечение
}

function changePattern(pat) {
    document.body.style.backgroundImage = `url('${pat}')`;
}

// === ФУНКЦИЯ ЗАГРУЗКИ ТРЕКА ===
function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[index];
    
    audio.src = track.src;
    albumArt.src = track.img;
    trackName.textContent = track.name;
    trackAuthor.textContent = track.author;
    
    // Меняем фон плеера
    changePlayerColor(track.color);

    changePattern(track.pattern)
    
    progress.value = 0;
    timeDisplay.textContent = '0:00 / 0:00';
    
    audio.play();
    playBtn.textContent = '⏸';
    isPlaying = true;
}

// === КЛИК ПО СФЕРЕ 1 ===
sphere1.addEventListener('click', () => {
    loadTrack(0);
});

// === КЛИК ПО СФЕРЕ 2 ===
sphere2.addEventListener('click', () => {
    loadTrack(1);
});

// === PLAY/PAUSE ===
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
    }
});

// === ОБНОВЛЕНИЕ ПРОГРЕССА ===
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        
        const currentMins = Math.floor(audio.currentTime / 60);
        const currentSecs = Math.floor(audio.currentTime % 60);
        const totalMins = Math.floor(audio.duration / 60);
        const totalSecs = Math.floor(audio.duration % 60);
        
        timeDisplay.textContent = 
            `${currentMins}:${currentSecs.toString().padStart(2, '0')} / ${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
    }
});

// === ПЕРЕМОТКА ===
progress.addEventListener('input', () => {
    const time = (progress.value / 100) * audio.duration;
    audio.currentTime = time;
});

// === ГРОМКОСТЬ ===
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// === ПРИ ЗАВЕРШЕНИИ ТРЕКА ===
audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    isPlaying = false;
});

// Загружаем первый трек
loadTrack(0);