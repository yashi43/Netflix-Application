function MovieCard({ movie, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div className="movie-card">

      <div
        className="movie-poster"
        onClick={() => onSelect(movie)}
      >
        <img src={movie.poster} alt={movie.title} />

        <button
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(movie);
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div
        className="movie-info"
        onClick={() => onSelect(movie)}
      >
        <h3>{movie.title}</h3>

        <p>
          {movie.genre} • {movie.year}
        </p>

        <p>
          {movie.type} • {movie.duration}
        </p>

        <span className="rating">
          ⭐ {movie.rating}
        </span>
      </div>

    </div>
  );
}

export default MovieCard;