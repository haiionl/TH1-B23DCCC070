import React, { useState } from "react";
import axios from "axios";

function ImageSearch() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query.trim()}&image_type=photo`
      );
      setImages(response.data.hits);
    } catch (err) {
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Image Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
        />
        <button type="submit" style={{ marginLeft: "5px", padding: "10px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: "10px" }}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              style={{ width: "300px", height: "200px", borderRadius: "5px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;