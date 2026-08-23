package com.example.chatbot.service;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.repository.ChatRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import java.util.Map;

@Service
public class AiService {

    private final WebClient webClient;
    private final ChatRepository chatRepository;

    public AiService(WebClient.Builder webClientBuilder, ChatRepository chatRepository) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:11434").build();
        this.chatRepository = chatRepository;
    }

    public String getResponseFromAi(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "llama3.2",
                "prompt", prompt,
                "stream", false
        );

        try {
            Map response = webClient.post()
                    .uri("/api/generate")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("response")) {
                String aiResponse = response.get("response").toString();

                // Database mein chat save karne ka code
                ChatMessage chatMessage = new ChatMessage(prompt, aiResponse);
                chatRepository.save(chatMessage);

                return aiResponse;
            }
        } catch (Exception e) {
            return "Error connecting to Ollama: " + e.getMessage();
        }

        return "No response generated.";
    }

    // Streaming response method with database saving support
    public Flux<String> streamResponseFromAi(String model, String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", model != null ? model : "llama3.2",
                "prompt", prompt,
                "stream", true
        );

        // StringBuilder use kiya hai taake streaming complete hone par poora response database mein save ho sakay
        StringBuilder fullResponse = new StringBuilder();

        return webClient.post()
                .uri("/api/generate")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToFlux(Map.class)
                .map(response -> {
                    if (response != null && response.containsKey("response")) {
                        String chunk = response.get("response").toString();
                        fullResponse.append(chunk);
                        return chunk;
                    }
                    return "";
                })
                .doOnComplete(() -> {
                    // Jab stream mukammal ho jaye gi, tab yeh database mein save kar dega
                    if (fullResponse.length() > 0) {
                        ChatMessage chatMessage = new ChatMessage(prompt, fullResponse.toString());
                        chatRepository.save(chatMessage);
                    }
                });
    }
}