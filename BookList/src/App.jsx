import React, { useEffect ,useContext} from "react";
import BookCreate from "./component/BookCreate";
import BookList from "./component/BookList";
import "./App.css";
import { booksContext } from "./component/context/Book";

function App() {

const {fetchBooks} = useContext(booksContext);


  useEffect(() => {
    fetchBooks();
  }, []);

 

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookCreate/>
      <BookList  />
    </div>
  );
}

export default App;
