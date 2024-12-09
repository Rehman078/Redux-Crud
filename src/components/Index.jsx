import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, deleteBooks } from '../redux/bookSlice';

import '../App.css'
import { Link } from 'react-router-dom';
function Index() {
  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  // Get all books on mount
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  // Optional: Log books to track when they are updated
  useEffect(() => {
    console.log("Books updated:", books);
  }, [books]);

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteBooks(id)).then(() => {
      // Re-fetch the books after deleting one
      dispatch(getAllBooks());
    });
  };

  return (
    <>
      <h3 className="text-center mt-5">Book Details <span>({books.length})</span></h3>
      <div className="card card-margin px-2 py-2">
        <div className="add-btn">
           <Link to={"/addbook"}  className='btn btn-sm btn-secondary'>AddBook</Link> 
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{book.stock}</td>
                  <td>
                    <Link to={`edit/${book._id}`} className='btn btn-sm btn-success'>Edit</Link>
                    <button 
                      onClick={() => handleDelete(book._id)}
                      className="btn btn-sm btn-danger ms-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Index;
