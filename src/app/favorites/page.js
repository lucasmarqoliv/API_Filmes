"use client"; // Marca este componente como Client Component

import { useEffect, useState } from 'react';
import './Favorites.css'; // Estilos para a página de favoritos

export default function Favorites() {
    const [favorites, setFavorites] = useState([]); // Estado para armazenar a lista de favoritos

    useEffect(() => {
        // Carrega a lista de favoritos do localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <div className="favorites-container">
            <h1>Favoritos</h1>
            {favorites.length === 0 ? (
                <p>Você não tem filmes favoritos.</p>
            ) : (
                <ul className="favorites-list">
                    {favorites.map((movie) => (
                        <li key={movie.imdbID} className="favorite-item">
                            <a href={`/movies/${movie.imdbID}`} className="favorite-link">
                                <img src={movie.Poster} alt={movie.Title} className="favorite-poster" />
                                <div className="favorite-info">
                                    <h3 className="favorite-title">{movie.Title} ({movie.Year})</h3>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
