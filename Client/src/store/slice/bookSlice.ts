import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import type { Book } from "../../components/types";

const API_URL = "http://localhost:8080/books";

export const getAllBooks = createAsyncThunk("books/getAllBooks", async () => {
  const response = await axios.get(API_URL);
  return response.data as Book[];
});

export const createBook = createAsyncThunk(
  "books/createBook",
  async (book: Omit<Book, "id">) => {
    const response = await axios.post(API_URL, book);
    return response.data as Book;
  }
);
export const updateBookApi = createAsyncThunk(
  "books/updateBook",
  async (book: Book) => {
    const response = await axios.put(`${API_URL}/${book.id}`, book);
    return response.data as Book;
  }
);

export const deleteBookApi = createAsyncThunk(
  "books/deleteBook",
  async (id: string | number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [] as Book[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
      })

      //create
      .addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.unshift(action.payload);
      })

      //update
      .addCase(updateBookApi.fulfilled, (state, action: PayloadAction<Book>) => {
        const idx = state.books.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) {
          state.books[idx] = action.payload;
        }
      })


      //delete
      .addCase(
        deleteBookApi.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          state.books = state.books.filter((b) => b.id !== action.payload);
        }
      );
  },
});

export default bookSlice.reducer;
