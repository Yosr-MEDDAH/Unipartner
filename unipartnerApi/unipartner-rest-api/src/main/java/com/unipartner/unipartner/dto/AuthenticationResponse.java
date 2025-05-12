package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private UserRole userRole;
    private String userId;
}
