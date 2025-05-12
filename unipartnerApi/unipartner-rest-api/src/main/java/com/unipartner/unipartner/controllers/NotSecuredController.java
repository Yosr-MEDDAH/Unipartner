package com.unipartner.unipartner.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NotSecuredController {
    @GetMapping("/hello")
    public ResponseEntity helloUser(){
        return ResponseEntity.ok("Hello from admin endpoint");
    }
}
