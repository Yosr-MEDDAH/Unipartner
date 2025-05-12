package com.unipartner.unipartner.dto;

import lombok.Data;

import java.util.List;

@Data
public class SignupRequest {

    private String email;
    private String pwd;
    private String name;
    private String lastname;
    private String photo;
    private String gender;

    private List<String> skills;
    private List<String> interests;
    private List<String> redFlags;

}
