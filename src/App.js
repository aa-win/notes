import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage notes, input value, and editing
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Add or update a note
  const handleAddNote = () => {
    if (input.trim()) {
      if (editIndex !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === editIndex ? { ...note, text: input } : note
        );
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, { text: input, completed: false }]);
      }
      setInput('');
    }
  };

  // Set note to edit
  const handleEditNote = (index) => {
    setEditIndex(index);
    setInput(notes[index].text);
  };

  // Delete a note
  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Toggle note completion
  const handleCheckNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <div className="note-app">
        <h1 className="app-title">Notes</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a note..."
          />
          <button onClick={handleAddNote} className='addBtn'>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="note-list">
          {notes.map((note, index) => (
            <li
              key={index}
              className={`note-item ${editIndex === index ? 'editing' : ''}`}
            >
              <span className={`note-text ${note.completed ? 'completed' : ''}`}>
                {note.text}
              </span>
              <div className="note-actions">
                <button onClick={() => handleCheckNote(index)} className="check-btn">
                  ✅
                </button>
                <button onClick={() => handleEditNote(index)} className="edit-btn">
                  ✏️
                </button>
                <button onClick={() => handleDeleteNote(index)} className="delete-btn">
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
