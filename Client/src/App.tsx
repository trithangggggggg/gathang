import React, { useEffect, useMemo, useState } from "react";
import type { Book } from "./components/types";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookSearchSortFilter from "./components/BookSearchSortFilter";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooks,
  createBook,
  updateBookApi,
  deleteBookApi,
} from "./store/slice/bookSlice";
import Loading from "./components/Loading";

const App: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Book> | undefined>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"title" | "year">("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const dispatch = useDispatch<any>();

  const isLoading = useSelector((state: any) => state.books.loading);
  const books = useSelector((state: any) => state.books.books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

 
  const categories: string[] = useMemo(() => {
    return [...new Set(books.map((b: Book) => String(b.category)))].sort();
  }, [books]);

  const handleSubmit = (data: {
    id?: string;
    title: string;
    author: string;
    year: number;
    category: string;
  }) => {
    if (data.id) {
      dispatch(updateBookApi(data as Book));
    } else {
      dispatch(createBook({ ...data }));
    }
    setOpenForm(false);
  };

  const filteredSorted = useMemo(() => {
    let out = books.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (b: Book) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
    if (category !== "all")
      out = out.filter((b: Book) => String(b.category) === category);

    out.sort((a: Book, b: Book) => {
      if (sortBy === "title") {
        const r = a.title.localeCompare(b.title);
        return sortDir === "asc" ? r : -r;
      } else {
        const r = a.year - b.year;
        return sortDir === "asc" ? r : -r;
      }
    });
    return out;
  }, [books, search, category, sortBy, sortDir]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">📚 Book Library Manager</h1>

          <Button
            variant="contained"
            onClick={() => {
              setEditing(undefined);
              setOpenForm(true);
            }}
          >
            Add Book
          </Button>

          <div className="mt-4">
            <BookSearchSortFilter
              search={search}
              category={category}
              sortBy={sortBy}
              sortDir={sortDir}
              categories={categories}
              onSearchChange={setSearch}
              onCategoryChange={setCategory}
              onSortChange={(by, dir) => {
                setSortBy(by);
                setSortDir(dir);
              }}
              onClear={() => {
                setSearch("");
                setCategory("all");
                setSortBy("title");
                setSortDir("asc");
              }}
            />
          </div>

          <div className="mt-6">
            <BookList
              books={filteredSorted}
              onEdit={(b) => {
                setEditing(b);
                setOpenForm(true);
              }}
              onDelete={(id) => dispatch(deleteBookApi(id))}
            />
          </div>

          <BookForm
            open={openForm}
            initial={editing}
            onClose={() => setOpenForm(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default App;
