package com.unipartner.unipartner.services.jwt;

import com.unipartner.unipartner.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailsService();
    void exportUsersToCSV(String filePath);
}
