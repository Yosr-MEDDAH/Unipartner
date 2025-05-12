package com.unipartner.unipartner.collections;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "conversations")
@Data
public class Conversation {
    @Id
    private String id;
    @DBRef
    private User user1;
    @DBRef
    private User user2;
    @DBRef
    private List<Message> messages;
    private Date createdAt;
}
