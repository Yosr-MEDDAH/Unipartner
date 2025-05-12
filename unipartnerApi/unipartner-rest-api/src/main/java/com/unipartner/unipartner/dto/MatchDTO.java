package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.collections.User;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
@Data
public class MatchDTO {
    private String id;
    private User user1;
    private User user2;
    private Date createdAt;
}
