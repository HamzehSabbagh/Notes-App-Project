import { useEffect, useState } from "react";

type Note = {
  id: number;
  content: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState('')


  useEffect(() => {
    fetch('http://localhost:8080/notes')
      .then((res) => res.json())
      .then((data: Note[]) => setNotes(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('http://localhost:8080/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    setContent('')
  }

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE',
    })
  }

  return <div>
    <h1>Notes</h1>
    <form onSubmit={handleSubmit}>
      <textarea value={content} placeholder="Note content" onChange={(e) => setContent(e.target.value)}></textarea>
      <button type='submit'>Create a Note</button>
    </form>
    <ul>
      {
        notes.map((note) =>
          <div>
            <li key={note.id}>{note.id} - {note.content}</li>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        )
      }
    </ul>
  </div>
}

