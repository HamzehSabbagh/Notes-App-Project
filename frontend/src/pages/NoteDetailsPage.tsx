import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Note = {
    id: number;
    title: string;
    content: string;
}

export default function NoteDetailsPage() {
    const [note, setNote] = useState<Note | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() && !content.trim()) {
            setError('Title and Content are required.')
            return
        }

        if (!title.trim()) {
            setError('Title is required.')
            return
        }

        if (!content.trim()) {
            setError('Content is required.')
            return
        }

        setError('')

        try {
            const res = await fetch(`http://localhost:8080/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            })
            if (!res.ok) {
                const data = await res.text()
                setError(data || 'Something went wrong')
                return
            }
            navigate('/notes')
        } catch {
            setError('Request failed. Check the server or CORS settings')
        }
    }
    useEffect(() => {
        fetch(`http://localhost:8080/notes/${id}`)
            .then((res) => res.json())
            .then((data: Note) => {
                setNote(data)
                setContent(data.content)
                setTitle(data.title)

            })
    }, [id])

    const handleDelete = async () => {
        await fetch(`http://localhost:8080/notes/${id}`, {
            method: 'DELETE',
        })
        navigate('/notes')
    }


    return <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div>
            <h1 className="text-3xl font-semibold tracking-tight">Edit</h1>
            <p className="mt-2 text-sm text-stone-600">Note ID: {note?.id}</p>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            {error && (
                <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}
            <input
                type='text'
                placeholder="write the note title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-stone-600 bg-stone-800 px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            />
            <textarea
                placeholder="write the note here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-40 w-full rounded-xl border border-stone-600 bg-stone-800 px-4 py-3 transition text-sm outline-none focus:border-stone-500"
            />
            <button type='submit' className="rounded-xl bg-stone-800 px-4 py-3 text-sm font-medium text-white hover:bg-stone-700">Update</button>
        </form>
        <button onClick={handleDelete} className="rounded-xl border  border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100">Delete</button>

    </div>
}