package com.example.chatbot.controller;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.repository.ChatRepository;
import com.example.chatbot.service.AiService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final AiService aiService;
    private final ChatRepository chatRepository;

    public ChatController(AiService aiService, ChatRepository chatRepository) {
        this.aiService = aiService;
        this.chatRepository = chatRepository;
    }

    @PostMapping
    public Map<String, String> chatWithAi(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");
        String aiResponse = aiService.getResponseFromAi(prompt);
        return Map.of("response", aiResponse);
    }

    @PostMapping(value = "/stream", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> streamChatWithAi(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");
        String model = payload.getOrDefault("model", "llama3.2");
        return aiService.streamResponseFromAi(model, prompt);
    }

    // --- Clean CRUD Endpoints ---

    // GET: http://localhost:8080/api/chat/history
    @GetMapping("/history")
    public List<ChatMessage> getAllChatHistory() {
        return chatRepository.findAll();
    }

    // POST: http://localhost:8080/api/chat/history
    @PostMapping("/history")
    public ChatMessage saveChatMessage(@RequestBody ChatMessage chatMessage) {
        return chatRepository.save(chatMessage);
    }

    // DELETE: http://localhost:8080/api/chat/history/{id}
    @DeleteMapping("/history/{id}")
    public void deleteChatMessage(@PathVariable Long id) {
        chatRepository.deleteById(id);
    }
}