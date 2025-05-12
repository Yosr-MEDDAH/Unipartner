package com.unipartner.unipartner.collections;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "likes")
@Data
public class Like {
    @Id
    private String id;
    @DBRef
    private User fromUser;
    @DBRef
    private User toUser;
    private Date likedAt;
}

