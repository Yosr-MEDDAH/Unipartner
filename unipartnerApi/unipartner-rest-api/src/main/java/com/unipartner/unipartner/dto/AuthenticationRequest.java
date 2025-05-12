package com.unipartner.unipartner.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String pwd;
}
