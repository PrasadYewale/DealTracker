package com.dealtracker.backend.controller;

import com.dealtracker.backend.dto.LoginRequest;
import com.dealtracker.backend.dto.RegisterRequest;
import com.dealtracker.backend.models.User;
import com.dealtracker.backend.repository.userRepository;
import com.dealtracker.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ---------------------- REGISTER ----------------------
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email already exists!\"}");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok("{\"message\": \"Registered Successfully!\"}");
    }

    // ---------------------- LOGIN ----------------------
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        System.out.println("🟢 Login attempt for: " + request.getEmail());

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            System.out.println("❌ User not found for email: " + request.getEmail());
            return ResponseEntity.status(401).body("{\"message\": \"Invalid Credentials!\"}");
        }

        User user = userOpt.get();
        System.out.println("✅ User found: " + user.getEmail());
        System.out.println("Encoded password in DB: " + user.getPassword());

        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        // 🩵 If password is stored as plain text (old data), fix it automatically
        if (!matches && user.getPassword().equals(request.getPassword())) {
            System.out.println("⚠️ Plain password detected, re-encoding it...");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            matches = true;
        }

        System.out.println("Password matches: " + matches);

        if (!matches) {
            return ResponseEntity.status(401).body("{\"message\": \"Invalid Credentials!\"}");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println("✅ Login successful, token generated.");

        return ResponseEntity.ok("{\"token\": \"" + token + "\"}");
    }
}
