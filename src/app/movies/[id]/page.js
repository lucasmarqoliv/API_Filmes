"use client"; // Adicione esta linha para marcar este componente como Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para navegação
import axios from 'axios';
import './MovieDetails.css';

export default function MovieDetails({ params }) {
    const { id } = params; // Obtém o ID da URL
    const [movie, setMovie] = useState(null); // Estado para armazenar os dados do filme
    const [error, setError] = useState(''); // Estado para mensagens de erro

    const router = useRouter(); // Cria uma instância do useRouter

    // Função interna para buscar dados do filme pelo ID
    const fetchMovieById = async (id) => {
        const BASE_URL = 'https://www.omdbapi.com';
        const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY; // Substitua pela sua chave de API

        try {
            const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
            console.log('API Response:', response.data); // Verifique o que está sendo retornado
            return response.data;
        } catch (error) {
            console.error('Error fetching movie by ID:', error.message);
            return { Error: 'Failed to fetch movie details.' };
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetchMovieById(id);
            if (data.Error) {
                setError(data.Error);
            } else {
                setMovie(data);
            }
        };

        fetchMovie();
    }, [id]);

    const addToFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.find(favMovie => favMovie.imdbID === movie.imdbID);

        if (!isAlreadyFavorite) {
            favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${movie.Title} foi adicionado aos favoritos!`);
        } else {
            alert(`${movie.Title} já está na lista de favoritos!`);
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h1>{movie.Title} ({movie.Year})</h1>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            {/* Botão para voltar à página anterior */}
            <button onClick={() => router.back()} className="back-button">
                Voltar
            </button>
            {/* Botão para adicionar aos favoritos */}
            <button onClick={addToFavorites} className="favorite-button">
                Adicionar aos Favoritos
            </button>
        </div>
    );
}
