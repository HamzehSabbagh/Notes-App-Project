package com.hamzeh.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hamzeh.backend.Entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
