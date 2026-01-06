import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = "https://book-app-snb5.onrender.com";

// Create Book action
export const createBooks = createAsyncThunk(
  "books/createBooks", 
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/book`, data); 
      return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

// Read all books (for completeness)
export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books`);
      return response.data.data.bookData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Book action
export const deleteBooks = createAsyncThunk(
  "books/deleteBooks",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/book/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Book action
export const updateBooks = createAsyncThunk(
  "books/updateBooks", 
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/book/${data._id}`, data); 
      return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get all books
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle create book
      .addCase(createBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...state.books, action.payload.data]; // Assuming response has `data` with the new book
      })
      .addCase(createBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle delete book
      .addCase(deleteBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle update book
      .addCase(updateBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooks.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload.data;
        state.books = state.books.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
      })      
      .addCase(updateBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
