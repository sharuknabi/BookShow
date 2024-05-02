import { createContext, useState } from "react";
import axios from "axios";

const booksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

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

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <booksContext.Provider value={valueToShare}>
      {children}
    </booksContext.Provider>
  );
}

export { Provider, booksContext };
