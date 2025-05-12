package com.unipartner.unipartner.controllers;

import com.unipartner.unipartner.dto.SignalDTO;
import com.unipartner.unipartner.dto.UserDTO;
import com.unipartner.unipartner.exceptions.TargetUserNotFoundException;
import com.unipartner.unipartner.services.AuthServiceImpl;
import com.unipartner.unipartner.services.UnipartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final UnipartnerService service;
    private final AuthServiceImpl authService;
    @GetMapping("/helloAdmin")
    public ResponseEntity helloUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return ResponseEntity.ok("Hello "+currentPrincipalName +" from admin endpoint");
    }
    @GetMapping("user/{userId}")
    public UserDTO getUser(@PathVariable String userId){
        return service.getUserById(userId);
    }
    @GetMapping("/users")
    public List<UserDTO> users(){
        return service.findAllUsers();
    }
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable String id){
        service.deleteUser(id);
    }
    @PostMapping("/addSignal/{userId}")
    public SignalDTO addSignal(@PathVariable String userId, @RequestBody SignalDTO signalDTO) throws TargetUserNotFoundException {
        return service.saveSignal(signalDTO,userId);
    }

    @GetMapping("user{email}")
    public UserDTO getUserByEmail(@RequestParam(name = "email") String email){
        return authService.getUserByEmail(email);
    }

    @GetMapping("/getSignal/{signalId}")
    public SignalDTO getSignalById(@PathVariable String signalId){
        return service.getSignal(signalId);
    }

    @GetMapping("/getSignals/{userId}")
    public List<SignalDTO> getAllSignalsByUserId(@PathVariable String userId){
        return service.getSignalsByUserId(userId);
    }
    @DeleteMapping("/deleteSignal/{signalId}")
    public void deleteSignal(@PathVariable String signalId){
        service.deleteSignal(signalId);
    }
}
