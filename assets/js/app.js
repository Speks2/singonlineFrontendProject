const SUPABASE_URL = 'https://mqazwgooiooaafjhlaje.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYXp3Z29vaW9vYWFmamhsYWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODkzNDIsImV4cCI6MjAyOTk2NTM0Mn0.J_jfNmv1xVXEvMXgmPL_q9Jm9SE4eAnTnIOlNbIWw4w';

// Initialize Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log(supabaseClient);

// Function to fetch songs from Supabase
async function fetchSongs() {
    try {
        const { data, error } = await supabaseClient
            .from('Songs')
            .select('*');

        if (error) {
            throw new Error(error);
        }
       console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching songs:', error.message);
        return [];
    }
}

// Function to render songs in the HTML
async function renderSongs() {
    const songListElement = document.getElementById('song-list');
    const songs = await fetchSongs();

    songs.forEach(song => {
        const songTitleElement = document.createElement('h2');
        songTitleElement.textContent = song.title;

        songListElement.appendChild(songTitleElement);
    });
     
}
// Call renderSongs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});