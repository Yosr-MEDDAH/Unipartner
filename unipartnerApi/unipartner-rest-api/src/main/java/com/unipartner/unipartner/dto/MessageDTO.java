package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.collections.User;
import lombok.Data;

import java.util.Date;

@Data
public class MessageDTO {
    private String id;
    private String text;
    private User fromUser;
    private User toUser;
    private Date createdAt;
}
