import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function CreateNotePage() {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
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
            const res = await fetch('http://localhost:8080/notes', {
                method: 'POST',
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


    return <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div>
            <h1 text-3xl font-semibold tracking-tight>Create Note</h1>
            <p className="mt-2 text-sm text-stone-600">
                Add a title and some content for your next note.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
                <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            <input
                type='text'
                placeholder="Please Write the Note Title Here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-stone-600 bg-stone-800 px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            />
            <textarea
                placeholder="Please Write the Note Content Here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-40 w-full rounded-xl border border-stone-600 bg-stone-800 px-4 py-3 text-sm outline-none transition focus:border-stone-500"
            />
            <button type='submit' className="rounded-xl bg-stone-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700">Create Note</button>
        </form>
    </div>
}