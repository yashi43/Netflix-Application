import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/movies/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Add / Edit modal state
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "", description: "", genre: "", type: "movie",
    year: "", rating: "", duration: "", director: "", cast: "",
    poster: "", banner_url: "", trailer: "",
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("netflixFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("netflixFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // ── FETCH all movies ──────────────────────────────────────────────────────
  const fetchMovies = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => { setMovies(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  useEffect(() => { fetchMovies(); }, []);

  // ── FILTER & SORT ─────────────────────────────────────────────────────────
  const filteredMovies = movies
    .filter((movie) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        movie.title.toLowerCase().includes(searchText) ||
        movie.genre.toLowerCase().includes(searchText) ||
        (movie.director || "").toLowerCase().includes(searchText) ||
        (movie.cast || "").toLowerCase().includes(searchText) ||
        movie.description.toLowerCase().includes(searchText);
      const matchesType =
        contentType === "All" ||
        movie.type.toLowerCase() === contentType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "rating-high") return b.rating - a.rating;
      if (sortBy === "rating-low") return a.rating - b.rating;
      if (sortBy === "year-new") return b.year - a.year;
      if (sortBy === "year-old") return a.year - b.year;
      return 0;
    });

  const toggleFavorite = (movie) => {
    setFavorites((cur) => {
      const already = cur.some((f) => f.id === movie.id);
      return already ? cur.filter((f) => f.id !== movie.id) : [...cur, movie];
    });
  };

  // ── FORM helpers ──────────────────────────────────────────────────────────
  const openAddForm = () => {
    setEditingMovie(null);
    setFormData({
      title: "", description: "", genre: "", type: "movie",
      year: "", rating: "", duration: "", director: "", cast: "",
      poster: "", banner_url: "", trailer: "",
    });
    setShowForm(true);
  };

  const openEditForm = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title, description: movie.description,
      genre: movie.genre, type: movie.type,
      year: movie.year, rating: movie.rating,
      duration: movie.duration, director: movie.director,
      cast: movie.cast, poster: movie.poster,
      banner_url: movie.banner_url || "", trailer: movie.trailer,
    });
    setShowForm(true);
  };

  const handleFormChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── CREATE ────────────────────────────────────────────────────────────────
  const handleCreate = (e) => {
    e.preventDefault();
    const body = {
      title: formData.title, description: formData.description,
      genre: formData.genre, type: formData.type,
      year: parseInt(formData.year), rating: parseFloat(formData.rating),
      duration: formData.duration, director: formData.director,
      cast: formData.cast, poster: formData.poster,
      banner_url: formData.banner_url || formData.poster,
      trailer: formData.trailer,
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => { if (!res.ok) throw new Error("Create failed"); return res.json(); })
      .then(() => { setShowForm(false); fetchMovies(); })
      .catch((err) => alert("Error: " + err.message));
  };

  // ── UPDATE ────────────────────────────────────────────────────────────────
  const handleUpdate = (e) => {
    e.preventDefault();
    const body = {
      title: formData.title, description: formData.description,
      genre: formData.genre, type: formData.type,
      year: parseInt(formData.year), rating: parseFloat(formData.rating),
      duration: formData.duration, director: formData.director,
      cast: formData.cast, poster: formData.poster,
      banner_url: formData.banner_url || formData.poster,
      trailer: formData.trailer,
    };
    fetch(`${API_URL}${editingMovie.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => { if (!res.ok) throw new Error("Update failed"); return res.json(); })
      .then(() => { setShowForm(false); setEditingMovie(null); fetchMovies(); })
      .catch((err) => alert("Error: " + err.message));
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = (movie) => {
    if (!window.confirm(`Delete "${movie.title}"?`)) return;
    fetch(`${API_URL}${movie.id}/`, { method: "DELETE" })
      .then((res) => { if (!res.ok) throw new Error("Delete failed"); fetchMovies(); })
      .catch((err) => alert("Error: " + err.message));
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">Netflix</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#favorites">Favorites</a>
        </div>
        <input
          className="search-box"
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="favorite-count">♥ {favorites.length}</div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO Netflix</p>
          <h1>Stories that stay<br />with you.</h1>
          <p>Explore movies and series, discover new stories, and find something worth watching.</p>
          <button
            className="hero-button"
            onClick={() => document.getElementById("movies").scrollIntoView({ behavior: "smooth" })}
          >
            Explore Now
          </button>
        </div>
      </section>

      <main className="content" id="movies">
        <div className="section-heading">
          <div>
            <p className="small-heading">CURATED FOR YOU</p>
            <h2>Popular Picks</h2>
          </div>
          <span>{filteredMovies.length} titles</span>
        </div>

        {/* ── Add Movie Button ── */}
        <div style={{ marginBottom: "1rem" }}>
          <button className="hero-button" onClick={openAddForm}>
            + Add Movie
          </button>
        </div>

        <div className="filters">
          {["All", "Movie", "Series"].map((t) => (
            <button
              key={t}
              className={contentType === t ? "active-filter" : ""}
              onClick={() => setContentType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="sort-section">
          <label htmlFor="sortMovies">Sort by:</label>
          <select id="sortMovies" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
            <option value="year-new">Newest First</option>
            <option value="year-old">Oldest First</option>
          </select>
        </div>

        {loading && <div className="no-results"><h3>Loading...</h3></div>}
        {error && <div className="no-results"><h3>⚠ {error}</h3><p>Make sure the Django server is running at localhost:8000</p></div>}

        {!loading && !error && (
          filteredMovies.length > 0 ? (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <div key={movie.id} style={{ position: "relative" }}>
                  <MovieCard
                    movie={movie}
                    onSelect={setSelectedMovie}
                    isFavorite={favorites.some((f) => f.id === movie.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                  {/* Edit / Delete controls */}
                  <div style={{ display: "flex", gap: "0.5rem", padding: "0.4rem 0.6rem" }}>
                    <button
                      onClick={() => openEditForm(movie)}
                      style={{ flex: 1, padding: "0.3rem", background: "#f59e0b", color: "#000", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie)}
                      style={{ flex: 1, padding: "0.3rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No titles found</h3>
              <p>Try a different search or filter.</p>
            </div>
          )
        )}
      </main>

      {/* ── Favorites Section ── */}
      <section className="content favorites-section" id="favorites">
        <div className="section-heading">
          <div>
            <p className="small-heading">YOUR COLLECTION</p>
            <h2>Favorites</h2>
          </div>
          <span>{favorites.length} saved</span>
        </div>

        {favorites.length > 0 ? (
          <div className="movie-grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No favorites yet</h3>
            <p>Click the heart on a title to save it here.</p>
          </div>
        )}
      </section>

      {/* ── Movie Detail Modal ── */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      {/* ── Add / Edit Form Modal ── */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px", width: "90%", overflowY: "auto", maxHeight: "90vh" }}>
            <button className="close-button" onClick={() => setShowForm(false)}>×</button>
            <h2 style={{ marginBottom: "1rem" }}>{editingMovie ? "Edit Movie" : "Add Movie"}</h2>

            <form onSubmit={editingMovie ? handleUpdate : handleCreate} style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[
                { name: "title", placeholder: "Title *", required: true },
                { name: "genre", placeholder: "Genre (e.g. Action, Drama)" },
                { name: "year", placeholder: "Release Year (e.g. 2023)", type: "number" },
                { name: "rating", placeholder: "Rating (0.0 – 9.9)", type: "number", step: "0.1" },
                { name: "duration", placeholder: "Duration (e.g. 2h 15m)" },
                { name: "director", placeholder: "Director" },
                { name: "cast", placeholder: "Cast (comma separated)" },
                { name: "poster", placeholder: "Poster Image URL" },
                { name: "banner_url", placeholder: "Banner Image URL (optional)" },
                { name: "trailer", placeholder: "Trailer Embed URL (YouTube)" },
              ].map(({ name, placeholder, type = "text", required, step }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  step={step}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleFormChange}
                  required={!!required}
                  style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #555", background: "#1a1a2e", color: "#eee", fontSize: "0.9rem" }}
                />
              ))}

              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleFormChange}
                required
                rows={3}
                style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #555", background: "#1a1a2e", color: "#eee", fontSize: "0.9rem", resize: "vertical" }}
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #555", background: "#1a1a2e", color: "#eee" }}
              >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>

              <button type="submit" className="hero-button" style={{ marginTop: "0.5rem" }}>
                {editingMovie ? "Save Changes" : "Add Movie"}
              </button>
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 netflix</p>
        <p>A React + Django Full-Stack Application</p>
      </footer>

    </div>
  );
}

export default App;