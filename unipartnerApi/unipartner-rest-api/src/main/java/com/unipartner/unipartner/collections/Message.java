package com.unipartner.unipartner.collections;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "messages")
@Data
public class Message {
    @Id
    private String id;
    private String text;
    @DBRef
    private User fromUser;
    @DBRef
    private User toUser;
    private Date createdAt;
}
