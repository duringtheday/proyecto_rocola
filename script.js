// Simulate asynchronous song retrieval
async function obtenerCanciones() {
    return new Promise(resolve => {
        setTimeout(() => {
            const canciones = [
                { "id": 1, name: "Hoobastank - The Reason", "url": "https://www.youtube.com/embed/fV4DiAyExN0?si=u5AOv9F1FrsYWjun" },
                { "id": 2, name: "Bon Jovi - This Ain't A Love Song", "url": "https://www.youtube.com/embed/-nlDy6h-v9c?si=GOjnnt76_EOduEpJ" },
                { "id": 3, name: "Creed - With Arms Wide Open", "url": "https://www.youtube.com/embed/2ZCGONODd6M?si=ypLi3m0P4LwtR8ae" },
                { "id": 4, name: "Seal - Kiss From A Rose", "url": "https://www.youtube.com/embed/hDd2G_V1rzc?si=LFdbXFthYYzV6aXt" },
                { "id": 5, name: "Take That - Back for Good", "url": "https://www.youtube.com/embed/AX_6S_cz7Jg?si=Ch9O4svhHZ3-Twmo" }
            ];
            resolve(canciones);
        }, 1000); // Simulate 1 second delay
    });
}

let recentlyPlayed = [];
const turnosParaRepetir = 4; // Number of turns to avoid repeating the same song

document.getElementById('play').addEventListener('click', async () => {
    const todasLasCanciones = await obtenerCanciones();
    playSong(todasLasCanciones);
});

async function playSong(canciones) {
    let availableSongs = canciones.filter(song => !recentlyPlayed.includes(song.id));

    if (availableSongs.length === 0) {
        // If all songs have been played, reset the list
        recentlyPlayed = [];
        availableSongs = canciones; // Allow any song to be played again
    }

    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    const songToPlay = availableSongs[randomIndex];

    // Update iframe and current song display
    let iframe = document.getElementById('iframe');
    iframe.src = songToPlay.url;

    let currentSong = document.getElementById('current-song');
    currentSong.textContent = songToPlay.name;

    // Add song to recently played list
    recentlyPlayed.push(songToPlay.id);

    // Remove the oldest song if the list exceeds the limit
    if (recentlyPlayed.length > turnosParaRepetir) {
        recentlyPlayed.shift();
    }
}
