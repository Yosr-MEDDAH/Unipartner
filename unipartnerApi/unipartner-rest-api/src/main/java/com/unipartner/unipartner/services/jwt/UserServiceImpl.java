package com.unipartner.unipartner.services.jwt;

import com.opencsv.CSVWriter;
import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.UserDTO;
import com.unipartner.unipartner.enums.UserRole;
import com.unipartner.unipartner.mappers.UnipartnerMapper;
import com.unipartner.unipartner.repositories.UserRepository;
import com.unipartner.unipartner.services.UnipartnerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UnipartnerMapper dtoMapper;
    private final UnipartnerServiceImpl unipartnerService;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findFirstByEmail(username)
                        .orElseThrow(()->new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Override
    public void exportUsersToCSV(String filePath) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath))) {
            writer.writeNext(new String[]{"Student-ID", "Skills", "Interests", "Red-Flags"});
            List<UserDTO> users = unipartnerService.findAllUsers();

            for (UserDTO userDTO : users) {
                if (userDTO.getSkills()!=null && userDTO.getInterests()!=null && userDTO.getRedFlags()!=null && userDTO.getUserRole()!= UserRole.ADMIN) {

                    writer.writeNext(new String[]{
                            String.valueOf(userDTO.getId()),
                            String.join(",", userDTO.getSkills()),
                            String.join(",", userDTO.getInterests()),
                            String.join(",", userDTO.getRedFlags())
                    });
                }
                else if(userDTO.getInterests()==null && userDTO.getUserRole()!= UserRole.ADMIN){
                    writer.writeNext(new String[]{
                            String.valueOf(userDTO.getId()),
                            String.join(",", userDTO.getSkills()),
                            String.join(",", ""),
                            String.join(",", userDTO.getRedFlags())
                    });
                } else if (userDTO.getRedFlags()==null && userDTO.getUserRole()!= UserRole.ADMIN) {
                    writer.writeNext(new String[]{
                            String.valueOf(userDTO.getId()),
                            String.join(",", userDTO.getSkills()),
                            String.join(",", userDTO.getInterests()),
                            String.join(",", "")
                    });
                }
                System.out.println("CSV file created successfully!");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
