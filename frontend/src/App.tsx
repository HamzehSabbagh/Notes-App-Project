import { useEffect, useState } from "react";

type Note = {
  id: number;
  content: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const loadNotes = async () => {
    const res = await fetch('http://localhost:8080/notes')
    const data: Note[] = await res.json()
    setNotes(data)
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url =
      editingId !== null
        ? `http://localhost:8080/notes/${editingId}`
        : 'http://localhost:8080/notes'

    const method = editingId !== null ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      console.error('Request failed')
      return
    }

    setEditingId(null)
    setContent('')
    await loadNotes()
  }
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE',
    })
    await loadNotes()
  }

  return <div>
    <h1>Notes</h1>
    <form onSubmit={handleSubmit}>
      <textarea value={content} placeholder="Note content" onChange={(e) => setContent(e.target.value)}></textarea>
      <button type='submit'>
        {editingId !== null ? 'Update Note' : 'Create a Note'}
      </button>
    </form>
    <button onClick={() => {
      setEditingId(null)
      setContent('')
    }}
    >
      Back
    </button>
    <ul>
      {
        notes.map((note) =>
          <div key={note.id}>
            <li>{note.id} - {note.content}</li>
            <button onClick={() => {
              setEditingId(note.id)
              setContent(note.content)
            }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        )
      }
    </ul>
  </div>
}
