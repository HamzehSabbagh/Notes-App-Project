import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type Note = {
    id: number;
    title: string;
    content: string;
}

export default function NotesListPage() {
    const [notes, setNotes] = useState<Note[]>([])
    const loadNotes = async () => {
        const res = await fetch('http://localhost:8080/notes')
        const data: Note[] = await res.json()
        setNotes(data)
    }

    useEffect(() => {
        loadNotes()
    }, [])

    return <div className="flex flex-col gap-6">
        <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Notes List Page</h1>
            <p className="mt-2 text-sm text-stone-400">Browse your notes and open one to edit or delete it.</p>
        </div>

        <ul className="flex flex-col gap-4">
            {notes.map((note) => (
                <li key={note.id}>
                    <Link className="hover:text-stone-600 hover:border-b border-stone-900" to={`/notes/${note.id}`}>{note.id} - {note.title}</Link>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    </div>
}