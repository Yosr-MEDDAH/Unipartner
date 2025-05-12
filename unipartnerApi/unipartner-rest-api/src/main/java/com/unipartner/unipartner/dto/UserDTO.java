package com.unipartner.unipartner.dto;

import com.mongodb.lang.Nullable;
import com.unipartner.unipartner.collections.Like;
import com.unipartner.unipartner.collections.Match;
import com.unipartner.unipartner.collections.Signal;
import com.unipartner.unipartner.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {

    private String id;

    private String email;
    private String pwd;
    private String name;
    private String lastname;
    private String photo;
    private String gender;

    private UserRole userRole;

    private List<String> skills;
    private List<String> interests;
    private List<String> redFlags;

    @Nullable
    private List<Signal> signals;
    private List<Like> likesReceived;
    private List<Match> matches;
}