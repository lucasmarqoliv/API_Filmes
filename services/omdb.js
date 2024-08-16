import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

console.log('chave api =', API_KEY, 'url base =', BASE_URL);

export const fetchMovies = async (query, page = 1) => {
    try {
        // Cada página retorna 10 resultados na API do OMDb
        const response = await axios.get(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
        
        if (response.data.Response === 'True') {
            return {
                Search: response.data.Search,
                totalResults: parseInt(response.data.totalResults, 10),
            };
        } else {
            return { Search: [], totalResults: 0 };
        }
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        return { Search: [], totalResults: 0 };
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        return null;
    }
};
