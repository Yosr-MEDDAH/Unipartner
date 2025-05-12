package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.collections.User;
import lombok.Data;

import java.util.Date;
@Data
public class LikeDTO {
    private String id;
    private User fromUser;
    private User toUser;
    private Date likedAt;
}


