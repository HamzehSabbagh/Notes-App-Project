package com.hamzeh.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hamzeh.backend.Services.NoteService;
import com.hamzeh.backend.dto.NoteRequest;
import com.hamzeh.backend.dto.NoteResponse;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/notes")
    public NoteResponse createNote(@Valid @RequestBody NoteRequest request) {
        return noteService.createNote(request);
    }

    @GetMapping("/notes")
    public List<NoteResponse> getNotes() {
        return noteService.getNotes();
    }

    @GetMapping("/notes/{id}")
    public NoteResponse getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    @PutMapping("/notes/{id}")
    public NoteResponse updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest request) {
        return noteService.updateNote(id, request);
    }

    @DeleteMapping("/notes/{id}")
    public Map<String, String> deleteNote(@PathVariable long id) {
        noteService.deleteNote(id);

        return Map.of("message", "Note deleted successfully");
    }
}
