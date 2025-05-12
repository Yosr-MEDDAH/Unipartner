package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepositorie extends MongoRepository<Message,String> {
}
