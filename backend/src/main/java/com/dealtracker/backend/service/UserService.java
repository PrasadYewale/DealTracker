package com.dealtracker.backend.service;
import com.dealtracker.backend.models.User;
import com.dealtracker.backend.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private userRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
