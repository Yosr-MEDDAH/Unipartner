package com.unipartner.unipartner.controllers;

import com.unipartner.unipartner.dto.UserDTO;
import com.unipartner.unipartner.repositories.UserRepository;
import com.unipartner.unipartner.services.AuthService;
import com.unipartner.unipartner.services.jwt.UserService;
import com.unipartner.unipartner.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class TestUserController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @GetMapping("/helloUser")
    @PreAuthorize("hasRole('ETUDIANT')")
    public String helloUser(){
        return "Hello from user endpoint";
    }


}
