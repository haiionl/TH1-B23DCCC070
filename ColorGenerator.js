import React, { useState, useEffect, useRef } from "react";

function ColorGenerator() {
  const [color, setColor] = useState("#ffffff");
  const [history, setHistory] = useState([]);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const intervalRef = useRef(null);

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setHistory((prevHistory) => [...prevHistory, color]);
    setColor(randomColor);
  };

  const startAutoGenerate = () => {
    if (!isAutoGenerating) {
      setIsAutoGenerating(true);
      intervalRef.current = setInterval(generateRandomColor, 1000);
    }
  };

  const stopAutoGenerate = () => {
    clearInterval(intervalRef.current);
    setIsAutoGenerating(false);
  };

  const undoColorChange = () => {
    if (history.length > 0) {
      const previousColor = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1)); 
      setColor(previousColor);
    }
  };

  const selectColorFromHistory = (selectedColor) => {
    setHistory((prevHistory) => [...prevHistory, color]);
    setColor(selectedColor);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Random Color Generator</h2>

      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: color,
          margin: "20px auto",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p style={{ color: "#fff", lineHeight: "200px" }}>{color}</p>
      </div>

      <button onClick={generateRandomColor} style={{ padding: "10px 20px", marginRight: "10px" }}>
        Generate
      </button>

      {isAutoGenerating ? (
        <button onClick={stopAutoGenerate} style={{ padding: "10px 20px", marginRight: "10px" }}>
          Stop Auto Generate
        </button>
      ) : (
        <button onClick={startAutoGenerate} style={{ padding: "10px 20px", marginRight: "10px" }}>
          Start Auto Generate
        </button>
      )}

      <button onClick={undoColorChange} style={{ padding: "10px 20px" }} disabled={history.length === 0}>
        Undo
      </button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Color History</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {history.length > 0 ? (
            history.map((col, index) => (
              <div
                key={index}
                onClick={() => selectColorFromHistory(col)}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: col,
                  margin: "5px",
                  cursor: "pointer",
                  border: "1px solid #000",
                }}
                title={`Click to select ${col}`}
              />))
              ) : (
                <p>No history yet.</p>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    export default ColorGenerator;