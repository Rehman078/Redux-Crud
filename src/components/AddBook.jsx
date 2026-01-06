import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createBooks } from '../redux/bookSlice';
import { useToast } from './Toast';
import '../App.css';

function AddBook() {
  const { loading } = useSelector((state) => state.books);
  const [book, setBook] = useState({
    name: '',
    author: '',
    price: '',
    stock: '',
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};

    if (!book.name.trim()) {
      newErrors.name = 'Book name is required';
    } else if (book.name.trim().length < 2) {
      newErrors.name = 'Book name must be at least 2 characters';
    }

    if (!book.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (book.author.trim().length < 2) {
      newErrors.author = 'Author name must be at least 2 characters';
    }

    if (!book.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(book.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!book.stock) {
      newErrors.stock = 'Stock is required';
    } else if (parseInt(book.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createBooks(book)).unwrap();
      toast.success('Book Added', `"${book.name}" has been added to the library`);
      navigate('/');
    } catch (error) {
      toast.error('Failed to Add', error || 'Could not add the book');
    }
  };

  return (
    <>
      <h1 className="page-title">Add New Book</h1>

      <div className="card-container">
        <Link to="/" className="back-link">
          ← Back to Library
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter book title"
            />
            {errors.name && <span className="invalid-feedback">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Author Name</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className={`form-control ${errors.author ? 'is-invalid' : ''}`}
              placeholder="Enter author name"
            />
            {errors.author && <span className="invalid-feedback">{errors.author}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                value={book.price}
                onChange={handleChange}
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && <span className="invalid-feedback">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={book.stock}
                onChange={handleChange}
                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.stock && <span className="invalid-feedback">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner" style={{ width: 16, height: 16 }}></span>
                  Adding...
                </>
              ) : (
                'Add Book'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBook;
