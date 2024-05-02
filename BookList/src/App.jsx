import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./component/BookCreate";
import BookList from "./component/BookList";
import   './App.css';




function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    const newBook = response.data;
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };
  
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    const updatedBook = response.data;
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? updatedBook : book))
    );
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

 

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookCreate onCreate={createBook} />
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
    </div>
  );
}

export default App;
