function MovieModal({ movie, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >

        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={movie.poster}
          alt={movie.title}
        />

        <div className="modal-content">

          <p className="small-heading">
            {movie.type}
          </p>

          <h2>{movie.title}</h2>

          <p className="modal-meta">
            {movie.genre} • {movie.year} • ⭐ {movie.rating}
          </p>

          <p>
            {movie.description}
          </p>

          <p>
            <strong>Director:</strong> {movie.director}
          </p>

          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>

          <p className="modal-duration">
            <strong>Duration:</strong> {movie.duration}
          </p>

          <div className="modal-actions">

            <a
              className="trailer-button"
              href={movie.trailer}
              target="_blank"
              rel="noreferrer"
            >
              ▶ Watch Trailer
            </a>

            <button
              className="hero-button"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieModal;