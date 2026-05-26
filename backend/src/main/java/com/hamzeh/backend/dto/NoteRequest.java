package com.hamzeh.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class NoteRequest {
    @NotBlank
    private String content;
    @NotBlank
    private String title;

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
