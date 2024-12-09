import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBooks } from '../redux/bookSlice';

function AddBook() {
 const {loading} = useSelector((state) => state.books)
  const [books, setBooks] = useState({
    name: "",
    author: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getBookData = (e) => {
    setBooks({ ...books, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting book:", books); 
    dispatch(createBooks(books)); // Dispatch the createBooks action with the 'books' data
    navigate("/");
  };

  return (
    <>
      <h3 className="text-center mt-5">Add Book</h3>
      <div className="card card-margin px-5 py-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Book Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={getBookData}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Author Name</label>
            <input
              type="text"
              name="author"
              className="form-control"
              onChange={getBookData}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={getBookData}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              onChange={getBookData}
              required
            />
          </div>
          <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-sm btn-primary" 
           disabled={loading}>
            {loading ? (
                <>
                <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true"
                ></span>
                Add Book...
                </>
            ) : (
                "Add Book"
            )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBook;
