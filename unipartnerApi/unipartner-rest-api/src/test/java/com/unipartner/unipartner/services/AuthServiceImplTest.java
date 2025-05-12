package com.unipartner.unipartner.services;

import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.SignupRequest;
import com.unipartner.unipartner.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@SpringBootTest
@RequiredArgsConstructor
public class AuthServiceImplTest {
    @InjectMocks
    private final AuthServiceImpl authService;
    @Mock
    private final UserRepository userRepository;

//    @Test
//    public void testCreateCustomer() {
//        // Functional Test: Valid signup request
//        SignupRequest signupRequest = createValidSignupRequest();
//        User createdUser = createValidUser();
//        when(userRepository.save(any(User.class))).thenReturn(createdUser);
//
//        UserDTO createdUserDto = authService.createCustomer(signupRequest);
//
//        assertNotNull(createdUserDto);
//        assertEquals(createdUser.getEmail(), createdUserDto.getEmail());
//        assertEquals(createdUser.getName(), createdUserDto.getName());
//        assertEquals(createdUser.getLastname(), createdUserDto.getLastname());
//        assertEquals(createdUser.getPhoto(), createdUserDto.getPhoto());
//        assertEquals(createdUser.getGender(), createdUserDto.getGender());
//        assertEquals(UserRole.ETUDIANT, createdUserDto.getUserRole());
//        assertEquals(createdUser.getSkills(), createdUserDto.getSkills());
//        assertEquals(createdUser.getInterests(), createdUserDto.getInterests());
//        assertEquals(createdUser.getRedFlags(), createdUserDto.getRedFlags());
//
//        // Non-Functional Test: Signup with existing email
//        when(userRepository.findFirstByEmail(signupRequest.getEmail())).thenReturn(Optional.of(createValidUser()));
//
//        assertThrows(RuntimeException.class, () -> authService.createCustomer(signupRequest));
//    }
//
//
//    private SignupRequest createValidSignupRequest() {
//        SignupRequest signupRequest = new SignupRequest();
//        signupRequest.setEmail("test@email.com");
//        signupRequest.setName("John");
//        signupRequest.setLastname("Doe");
//        signupRequest.setPwd("testpassword");
//        signupRequest.setPhoto("photo.jpg");
//        signupRequest.setGender("Male");
//        List<String> skills = new ArrayList<>();
//        List<String> interests = new ArrayList<>();
//        List<String> redFlags = new ArrayList<>();
//        return signupRequest;
//    }

}
