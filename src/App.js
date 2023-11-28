import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((apiData) => {
        // Extract relevant data from the API response
        const extractedData = apiData.map((post) => post.title);
        setData(extractedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setData([...data, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(data[index]);
  };

  const handleUpdate = () => {
    if (editValue.trim() !== "") {
      const newData = [...data];
      newData[editIndex] = editValue;
      setData(newData);
      setEditIndex(null);
      setEditValue("");
    }
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <div>
        <ul className="container">
          {data.map((item, index) => (
            <li key={index} className="card">
              <p className="text">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  item
                )}
              </p>
              <div className="buttonsBar">
                {editIndex === index ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
