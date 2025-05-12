package com.unipartner.unipartner.controllers;

import com.unipartner.unipartner.collections.Conversation;
import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.*;
import com.unipartner.unipartner.exceptions.SignalNotFoundException;
import com.unipartner.unipartner.exceptions.TargetUserNotFoundException;
import com.unipartner.unipartner.repositories.UserRepository;
import com.unipartner.unipartner.services.AuthService;
import com.unipartner.unipartner.services.UnipartnerServiceImpl;
import com.unipartner.unipartner.services.jwt.UserService;
import com.unipartner.unipartner.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UnipartnerServiceImpl service;


    @GetMapping("/users{email}")
    public UserDTO getUserByEmail(@RequestParam(name = "email") String email){
        return authService.getUserByEmail(email);
    }

    @PostMapping("/users/addSignal/{userId}")
    public ResponseEntity<SignalDTO> addSignal(@PathVariable String userId, @RequestBody SignalDTO signalDTO) {
        try {
            SignalDTO savedSignal = service.saveSignal(signalDTO, userId);
            return ResponseEntity.ok(savedSignal);
        } catch (TargetUserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/users/recommendedUsers")
    public List<UserDTO> users(){
        return service.findAllByTheirIds();
    }

    @GetMapping("/users/matches")
    public List<MatchDTO> getAllMatches(){
        return service.getAllMatches();
    }

    @PutMapping("/users/updateSignal/{signalId}")
    public ResponseEntity<SignalDTO> updateSignal(@PathVariable String signalId, @RequestBody SignalDTO signalDTO) {
        try {
            SignalDTO updatedSignal = service.updateSignal(signalDTO, signalId);
            return ResponseEntity.ok(updatedSignal);
        } catch (SignalNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/users/chat/addMessage/{conversationId}")
    public MessageDTO addMessage(@RequestBody MessageDTO messageDTO, @PathVariable String conversationId){
        return service.addMessage(messageDTO,conversationId);
    }

//    @PostMapping("/users/chat/addChat")
//    public ConversationDTO addConversation(User fromUser, User toUser){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        fromUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);
//        toUser = userRepository.findFirstByEmail("fraisa@gmail.com").get();
//        return service.addConversation(fromUser,toUser);
//    }

    @PostMapping("/users/addLike/{userId}")
    public LikeDTO likeUser(@PathVariable String userId){
        LikeDTO savedLike = service.likeUser(userId);
        return savedLike;
    }

    @GetMapping("/users/conversations")
    public List<ConversationDTO> getAllConversationByEmail(){
        return service.getAllConversations();
    }

    @GetMapping("/users/conversations/{id}")
    public ConversationDTO getConversation(@PathVariable String id){
        return service.getConversationById(id);
    }




    @GetMapping("/authenticated")
    public String authenticatedEndpoint() {
        return "Authenticated endpoint, requires any authenticated user";
    }


}
