package com.unipartner.unipartner.controllers;

import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.AuthenticationRequest;
import com.unipartner.unipartner.dto.AuthenticationResponse;
import com.unipartner.unipartner.dto.SignupRequest;
import com.unipartner.unipartner.dto.UserDTO;
import com.unipartner.unipartner.repositories.UserRepository;
import com.unipartner.unipartner.services.AuthService;
import com.unipartner.unipartner.services.jwt.UserService;
import com.unipartner.unipartner.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    @PostMapping("/signup")
    public ResponseEntity<?> createCustomer(@RequestBody SignupRequest signupRequest){
        if(authService.hasStudentWithEmail(signupRequest.getEmail()))
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email Already exists");
        UserDTO createdUserDto = authService.createUser(signupRequest);
        if(createdUserDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request !");
        userService.exportUsersToCSV("C:/Users/yosr/unipartnerApi/unipartner-rest-api/Student Recommendation system/data/students.csv");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPwd()));
            final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
            Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();
            if (optionalUser.isPresent()) {
                authenticationResponse.setJwt(jwt);
                authenticationResponse.setUserId(optionalUser.get().getId());
                authenticationResponse.setUserRole(optionalUser.get().getUserRole());
                return ResponseEntity.ok(authenticationResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }


}
