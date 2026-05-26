package com.hamzeh.backend.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hamzeh.backend.Entity.Note;
import com.hamzeh.backend.Repository.NoteRepository;
import com.hamzeh.backend.dto.NoteRequest;
import com.hamzeh.backend.dto.NoteResponse;
import com.hamzeh.backend.exception.NoteNotFoundException;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public NoteResponse createNote(NoteRequest request) {
        Note note = new Note();

        note.setContent(request.getContent());
        note.setTitle(request.getTitle());

        noteRepository.save(note);

        NoteResponse response = new NoteResponse();

        response.setId(note.getId());
        response.setContent(note.getContent());
        response.setTitle(note.getTitle());

        return response;
    }

    public List<NoteResponse> getNotes() {
        List<Note> notes = noteRepository.findAll();
        List<NoteResponse> responses = new ArrayList<>();

        for (Note note : notes) {
            NoteResponse response = new NoteResponse();

            response.setId(note.getId());
            response.setContent(note.getContent());
            response.setTitle(note.getTitle());

            responses.add(response);
        }

        return responses;
    }

    public NoteResponse getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));

        NoteResponse response = new NoteResponse();

        response.setId(note.getId());
        response.setContent(note.getContent());
        response.setTitle(note.getTitle());

        return response;
    }

    public NoteResponse updateNote(Long id, NoteRequest request) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));

        note.setContent(request.getContent());
        note.setTitle(request.getTitle());

        noteRepository.save(note);

        NoteResponse response = new NoteResponse();

        response.setId(note.getId());
        response.setContent(note.getContent());
        response.setTitle(note.getTitle());

        return response;
    }

    public void deleteNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));

        noteRepository.delete(note);
    }
}
