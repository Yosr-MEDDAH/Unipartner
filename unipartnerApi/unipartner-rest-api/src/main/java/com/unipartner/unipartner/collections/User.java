package com.unipartner.unipartner.collections;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.Nullable;
import com.unipartner.unipartner.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Document(collection = "users")
@Data
public class User implements UserDetails {
    @Id
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

    @DBRef
    @JsonIgnore
    private List<Signal> signals = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Like> likesReceived = new ArrayList<>();
    @DBRef
    @JsonIgnore
    private List<Match> matches = new ArrayList<>();

    public void addMatch(Match match) {
        this.matches.add(match);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



}