package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.Like;
import com.unipartner.unipartner.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LikeRepository extends MongoRepository<Like,String> {
    boolean existsByFromUserAndToUser(User toUser, User fromUser);
}
