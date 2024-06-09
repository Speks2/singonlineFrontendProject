const SUPABASE_URL = 'https://mqazwgooiooaafjhlaje.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYXp3Z29vaW9vYWFmamhsYWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODkzNDIsImV4cCI6MjAyOTk2NTM0Mn0.J_jfNmv1xVXEvMXgmPL_q9Jm9SE4eAnTnIOlNbIWw4w';

// Starts Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetches songs from Supabase
async function fetchSongs() {
    try {
        const { data, error } = await supabaseClient
            .from('Songs')
            .select('*');

        if (error) {
            throw new Error(error);
        }

        return data;
    } catch (error) {
        console.error('Error fetching songs:', error.message);
        return [];
    }
}

// Shows songs in HTML
async function renderSongs() {
    const songListElement = document.getElementById('song-list');
    const songs = await fetchSongs();
 
    if (songs.length === 0) {
        songListElement.innerHTML = '<p>No songs available</p>';
        return;
    }

    songs.forEach(song => { 

        const songTitleElement = document.createElement('h2');
        songTitleElement.textContent = song.title || 'Untitled';

        const songDetailsElement = document.createElement('div');
        songDetailsElement.className = 'song-details';
        songDetailsElement.innerHTML = `<p>${song.content || 'No details available'}</p>`;

        songTitleElement.addEventListener('click', () => {
            songDetailsElement.classList.toggle('open');
        });

        songListElement.appendChild(songTitleElement);
        songListElement.appendChild(songDetailsElement);
    });
}

// Calls renderSongs 
document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});