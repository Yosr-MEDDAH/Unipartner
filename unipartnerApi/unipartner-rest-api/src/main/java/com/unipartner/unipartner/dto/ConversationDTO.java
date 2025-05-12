package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.collections.Message;
import com.unipartner.unipartner.collections.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ConversationDTO {
    private String id;
    private User user1;
    private User user2;
    private List<Message> messages = new ArrayList<>();
    private Date createdAt;
}
