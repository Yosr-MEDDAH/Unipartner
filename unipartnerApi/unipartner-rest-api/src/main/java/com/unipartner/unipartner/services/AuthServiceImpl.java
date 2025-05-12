package com.unipartner.unipartner.services;

import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.SignupRequest;
import com.unipartner.unipartner.dto.UserDTO;
import com.unipartner.unipartner.enums.UserRole;
import com.unipartner.unipartner.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private  final UserRepository userRepository;

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPwd(new BCryptPasswordEncoder().encode(signupRequest.getPwd()));
        user.setLastname(signupRequest.getLastname());
        user.setPhoto(signupRequest.getPhoto());
        user.setGender(signupRequest.getGender());
        user.setSkills(signupRequest.getSkills());
        user.setInterests(signupRequest.getInterests());
        user.setRedFlags(signupRequest.getRedFlags());
        user.setUserRole(UserRole.ETUDIANT);
        User createdUser =userRepository.save(user);
        UserDTO createdUserDto = new UserDTO();
        BeanUtils.copyProperties(createdUser, createdUserDto);
//        createdUserDto.setId(createdUser.getId());
//        createdUserDto.setName(createdUser.getName());
//        createdUserDto.setEmail(createdUser.getEmail());
//        createdUserDto.setLastname(createdUser.getLastname());
//        createdUserDto.setPhoto(createdUser.getPhoto());
//        createdUserDto.setGender(createdUser.getGender());
//        createdUserDto.setUserRole(createdUser.getUserRole());
//        createdUserDto.setSkills(createdUser.getSkills());
//        createdUserDto.setInterests(createdUser.getInterests());
//        createdUserDto.setRedFlags(createdUser.getRedFlags());
        return createdUserDto;
    }

    @Override
    public boolean hasStudentWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        Optional<User> users = userRepository.findFirstByEmail(email);
        UserDTO createdUserDto;
        if (users.isPresent()) {
            User user = users.get();
            createdUserDto = new UserDTO();
            BeanUtils.copyProperties(user, createdUserDto);
        } else {
            throw new RuntimeException("ma famech");
        }
        return createdUserDto;
    }
}
