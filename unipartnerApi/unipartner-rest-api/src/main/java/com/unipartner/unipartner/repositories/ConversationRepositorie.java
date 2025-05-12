package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.Conversation;
import com.unipartner.unipartner.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConversationRepositorie extends MongoRepository<Conversation,String> {
    List<Conversation> findAllByUser1IsOrUser2Is(User user1, User user2);
}
