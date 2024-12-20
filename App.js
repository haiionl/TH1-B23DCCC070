import React, { useState } from "react";
import TodoList from "./TodoList";
import ImageSearch from "./ImageSearch";
import ColorGenerator from "./ColorGenerator";

function App() {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Combined App: Todo List, Image Search & Color Generator</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("todo")}
          style={{
            padding: "10px 20px",
            marginRight: "5px",
            backgroundColor: activeTab === "todo" ? "#008cba" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Todo List
        </button>
        <button
          onClick={() => setActiveTab("imageSearch")}
          style={{
            padding: "10px 20px",
            marginRight: "5px",
            backgroundColor: activeTab === "imageSearch" ? "#008cba" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Image Search
        </button>
        <button
          onClick={() => setActiveTab("colorGenerator")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "colorGenerator" ? "#008cba" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Color Generator
        </button>
      </div>

      {activeTab === "todo" && <TodoList />}
      {activeTab === "imageSearch" && <ImageSearch />}
      {activeTab === "colorGenerator" && <ColorGenerator />}
    </div>
  );
}

export default App;
