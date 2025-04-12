import React, { useState, useEffect } from "react";
import axios from "axios";

function Seeker() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");

  const handlelogout = () =>{
    localStorage.removeItem("user")
    window.location.href="/"
  }
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-assignment.onrender.com/book/books");
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

 
  const filterBooks = () => {
    const filtered = books.filter(
      (book) =>
        (!genre || book.genre.toLowerCase().includes(genre.toLowerCase())) &&
        (!location || book.location.toLowerCase().includes(location.toLowerCase()))
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">Seeker Dashboard</h2>

    
      <div className="mb-6 flex justify-between">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Search by Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none"
          />
        </div>
        <button
          onClick={filterBooks}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Filter
        </button>

        <button
          onClick={handlelogout}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-800"
        >
          Logout
        </button>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-500">{book.author}</p>
              <p className="text-gray-400">{book.genre}</p>
              <p className="mt-2 text-gray-600">Location: {book.location}</p>
              <p className="text-gray-600">Contact: {book.contact}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No books found matching your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Seeker;
