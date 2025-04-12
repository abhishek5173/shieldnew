import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Owner() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState(user?.mobile || '');

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/book/books');
      const ownerBooks = res.data.filter(book => book.ownerid === user.id);
      setBooks(ownerBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deletebook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/book/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  const handleAddBook = async () => {
    if (!title || !author || !genre || !location || !contact) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const newBook = {
        title,
        author,
        genre,
        location,
        contact,
        ownerid: user.id,
      };

      await axios.post('http://localhost:5000/book/books', newBook);
      setTitle('');
      setAuthor('');
      setGenre('');
      setLocation('');
      setContact(user?.mobile || '');
      fetchBooks();
    } catch (error) {
      alert('Failed to add book');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a Book</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="border px-3 py-2 rounded"
            />
            <input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Author"
              className="border px-3 py-2 rounded"
            />
            <input
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="Genre"
              className="border px-3 py-2 rounded"
            />
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Location"
              className="border px-3 py-2 rounded"
            />
            <input
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="Contact"
              className="border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={handleAddBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Add Book
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">My Books</h2>
          {books.length === 0 ? (
            <p>No books added yet.</p>
          ) : (
            <ul className="space-y-4">
              {books.map(book => (
                <li key={book.id} className="border p-4 rounded bg-gray-50">
                  <h3 className="text-lg font-bold">{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p><strong>Location:</strong> {book.location}</p>
                  <p><strong>Contact:</strong> {book.contact}</p>
                  <button onClick={()=>deletebook(book.id)} className='p-2 bg-red-600 rounded-lg text-white '>DELETE</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Owner;
