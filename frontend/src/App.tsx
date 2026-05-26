import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import NotesListPage from "./pages/NotesListPage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

export default function App() {
  return <BrowserRouter>
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <nav className="mx-auto flex max-w-4xl items-center justify-between border-b border-stone-300 px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">Notes App</h1>
        <div className="flex gap-4 text-sm font-medium">
          <Link to='/notes' className="rounded-md px-3 py-2 transition hover:bg-stone-700">
            All Notes
          </Link>
          <Link to='/notes/create' className="rounded-md px-3 py-2 transition hover:bg-stone-700">
            Create Note
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Routes>
          <Route path='/' element={<Navigate to='/notes' replace />} />
          <Route path='/notes' element={<NotesListPage />} />
          <Route path='/notes/create' element={<CreateNotePage />} />
          <Route path='/notes/:id' element={<NoteDetailsPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
}