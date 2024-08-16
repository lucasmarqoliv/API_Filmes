"use client";  // Indica que este componente é um Client Component

import { useState } from 'react';
import { fetchMovies } from '../../services/omdb';  // Ajuste o caminho se necessário
import './globals.css';

export default function Home() {
    const [query, setQuery] = useState('');  // Armazena o termo de busca
    const [movies, setMovies] = useState([]);  // Armazena os resultados da busca
    const [error, setError] = useState('');    // Armazena mensagens de erro
    const [currentPage, setCurrentPage] = useState(1);  // Armazena a página atual
    const [totalResults, setTotalResults] = useState(0); // Armazena o total de resultados
    const moviesPerPage = 10; // Quantidade de filmes por página

    // Função que lida com a busca quando o usuário submete o formulário
    const handleSearch = async (e) => {
        e.preventDefault();  // Previne o comportamento padrão do formulário
        if (query.length < 4) {
            setError('Please enter at least 4 characters.');
            return;  // Não faz a busca se a consulta tiver menos de 4 caracteres
        }
        setError('');        // Limpa qualquer erro anterior
        setCurrentPage(1);  // Reseta para a página 1 em uma nova busca
        const data = await fetchMovies(query, 1);  // Busca os filmes com base no termo
        if (data.Error) {
            setError(data.Error);
        } else {
            setMovies(data.Search.slice(0, moviesPerPage));  // Limita os resultados por página
            setTotalResults(Number(data.totalResults) || 0);  // Atualiza o total de resultados
        }
    };

    // Função para mudar a página
    const handlePageChange = async (page) => {
        if (page < 1 || (page - 1) * moviesPerPage >= totalResults) return; // Verifica se a página é válida
        setCurrentPage(page);
        const data = await fetchMovies(query, page);
        if (data.Error) {
            setError(data.Error);
        } else {
            setMovies(data.Search.slice(0, moviesPerPage));  // Limita os resultados por página
        }
    };

    return (
        <div className="container">
            {/* Link para a página de favoritos */}
            <nav className="nav-bar">
                <a href="/favorites" className="favorites-link">Ver Favoritos</a>
            </nav>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <ul className="movie-list">
                {movies.map(movie => (
                    <li key={movie.imdbID} className="movie-item">
                        <a href={`/movies/${movie.imdbID}`} className="movie-link">
                            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                            <div className="movie-info">
                                <h3 className="movie-title">{movie.Title} ({movie.Year})</h3>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            {totalResults > moviesPerPage && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    <span className="page-indicator">
                        Page {currentPage} of {Math.ceil(totalResults / moviesPerPage)}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={(currentPage - 1) * moviesPerPage + moviesPerPage >= totalResults}
                        className="pagination-button"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}