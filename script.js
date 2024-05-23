let tracks = [];
let currentTrackIndex = 0;
const togglePlayButton = document.getElementById('togglePlayBtn');
const prevTrackButton = document.getElementById('prevTrackBtn');
const nextTrackButton = document.getElementById('nextTrackBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIndicator = document.getElementById('volumeIndicator');
const albumCoverImg = document.getElementById('albumCover');
const trackNameElem = document.getElementById('trackName');
const musicianNameElem = document.getElementById('musician');
const playbackDurationElem = document.getElementById('playbackDuration');
const mediaPlayer = document.getElementById('mediaPlayer');
let isTrackPlaying = false;

fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        tracks = data;
        loadTrack(currentTrackIndex);
    })
    .catch(error => console.error('Error al cargar las canciones:', error));

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    trackNameElem.textContent = track.name;
    musicianNameElem.textContent = track.artist;
    albumCoverImg.src = track.img;
    mediaPlayer.src = track.path;
    isTrackPlaying = false;
    togglePlayButton.textContent = 'play_circle';
    albumCoverImg.classList.remove('rotating');
    albumCoverImg.style.animationPlayState = 'paused';
}

function togglePlayPause() {
    if (isTrackPlaying) {
        mediaPlayer.pause();
        togglePlayButton.textContent = 'play_circle';
        albumCoverImg.style.animationPlayState = 'paused';
    } else {
        mediaPlayer.play();
        togglePlayButton.textContent = 'pause_circle';
        albumCoverImg.classList.add('rotating');
        albumCoverImg.style.animationPlayState = 'running';
    }
    isTrackPlaying = !isTrackPlaying;
}

function updateVolumeLevel() {
    mediaPlayer.volume = volumeSlider.value / 100;
    volumeIndicator.textContent = volumeSlider.value;
}

function updatePlaybackDuration() {
    const minutes = Math.floor(mediaPlayer.currentTime / 60);
    const seconds = Math.floor(mediaPlayer.currentTime % 60).toString().padStart(2, '0');
    playbackDurationElem.textContent = `${minutes}:${seconds}`;
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
}

function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
}

togglePlayButton.addEventListener('click', togglePlayPause);
volumeSlider.addEventListener('input', updateVolumeLevel);
mediaPlayer.addEventListener('timeupdate', updatePlaybackDuration);
nextTrackButton.addEventListener('click', playNextTrack);
prevTrackButton.addEventListener('click', playPreviousTrack);
