package com.unipartner.unipartner.services;

import com.unipartner.unipartner.dto.SignupRequest;
import com.unipartner.unipartner.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupRequest signupRequest);
    boolean hasStudentWithEmail(String email);
    UserDTO getUserByEmail(String email);
}
