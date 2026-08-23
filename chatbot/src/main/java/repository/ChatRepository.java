package com.example.chatbot.repository;

import com.example.chatbot.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    // Yeh Spring Data JPA automatically database operations (save, findall, etc.) sambhal lega
}