const SUPABASE_URL = 'https://mqazwgooiooaafjhlaje.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYXp3Z29vaW9vYWFmamhsYWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODkzNDIsImV4cCI6MjAyOTk2NTM0Mn0.J_jfNmv1xVXEvMXgmPL_q9Jm9SE4eAnTnIOlNbIWw4w';

const { createClient } = supabase.createClient;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchSongs() {
    const { data, error } = await supabaseClient
        .from('songs')
        .select('*');

    if (error) {
        console.error('Error fetching songs:', error);
        return [];
    }

    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
    const contentElement = document.getElementById('content');
    const songs = await fetchSongs();

    if (songs.length === 0) {
        contentElement.innerHTML = '<p>No songs available.</p>';
        return;
    }

    songs.forEach(song => {
        const articleElement = document.createElement('article');
        articleElement.className = 'song';

        articleElement.innerHTML = `
            <h2>${song.title}</h2>
            <p>${song.artist}</p>
        `;

        contentElement.appendChild(articleElement);
    });
});