import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBooks } from '../redux/bookSlice';

function Update() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedBook, setUpdateBook] = useState({ name: '', author: '', price: '', stock: '' });
  const { id } = useParams();
  const { loading, books } = useSelector((state) => state.books);

  useEffect(() => {
    if (id && books.length > 0) {
      const singleBook = books.find((book) => book._id === id);
      if (singleBook) setUpdateBook(singleBook);
    }
  }, [id, books]);

  const handleChange = (e) => {
    setUpdateBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission
    dispatch(updateBooks(updatedBook));
    navigate('/');
  };

  return (
    <>
      <h3 className="text-center mt-5">Edit Book</h3>
      <div className="card card-margin px-5 py-4">
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-bold">Book Name</label>
            <input
              type="text"
              name="name"
              value={updatedBook?.name || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Author Name</label>
            <input
              type="text"
              name="author"
              value={updatedBook?.author || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Price</label>
            <input
              type="number"
              name="price"
              value={updatedBook?.price || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Stock</label>
            <input
              type="number"
              name="stock"
              value={updatedBook?.stock || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-sm btn-primary" 
           disabled={loading}>
            {loading ? (
                <>
                <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true"
                ></span>
                Updating...
                </>
            ) : (
                "Update Book"
            )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Update;
