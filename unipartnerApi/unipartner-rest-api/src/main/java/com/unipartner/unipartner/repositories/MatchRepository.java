package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.Match;
import com.unipartner.unipartner.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MatchRepository extends MongoRepository<Match,String> {
    boolean existsByUser1AndUser2(User user1, User user2);
}
