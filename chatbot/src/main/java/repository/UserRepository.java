package com.example.chatbot.repository;

import com.example.chatbot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Email ke zariye database se user talash karne ke liye
    Optional<User> findByEmail(String email);
}