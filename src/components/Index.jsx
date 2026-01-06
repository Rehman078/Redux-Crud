import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, deleteBooks } from '../redux/bookSlice';
import { Link } from 'react-router-dom';
import { useToast } from './Toast';
import '../App.css';

function Index() {
  const { books, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleDelete = async (id, bookName) => {
    setDeleting(true);
    try {
      await dispatch(deleteBooks(id)).unwrap();
      toast.success('Book Deleted', `"${bookName}" has been removed`);
    } catch (err) {
      toast.error('Delete Failed', err || 'Could not delete the book');
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const getStockClass = (stock) => {
    const stockNum = parseInt(stock);
    if (stockNum >= 50) return 'stock-high';
    if (stockNum >= 20) return 'stock-medium';
    return 'stock-low';
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="page-title">
        Book Library
        <span className="book-count">{books.length}</span>
      </h1>

      <div className="card-container">
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/addbook" className="btn btn-primary">
            + Add Book
          </Link>
        </div>

        {error && (
          <div className="error-container">
            <span className="error-icon">⚠</span>
            <span className="error-message">{error}</span>
          </div>
        )}

        {loading && !books.length ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading books...</span>
          </div>
        ) : filteredBooks.length > 0 ? (
          <table className="modern-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td className="book-name">{book.name}</td>
                  <td className="book-author">{book.author}</td>
                  <td className="book-price">${book.price}</td>
                  <td>
                    <span className={`book-stock ${getStockClass(book.stock)}`}>
                      {book.stock} units
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`edit/${book._id}`} className="btn btn-success">
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm({ id: book._id, name: book.name })}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>{searchTerm ? 'No books found' : 'No books yet'}</h3>
            <p>
              {searchTerm
                ? 'Try a different search term'
                : 'Start by adding your first book to the library'}
            </p>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <div className="confirm-icon">🗑️</div>
            <h3 className="confirm-title">Delete Book?</h3>
            <p className="confirm-message">
              Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
