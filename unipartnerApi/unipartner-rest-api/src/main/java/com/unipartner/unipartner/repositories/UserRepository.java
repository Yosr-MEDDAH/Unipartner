package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findFirstByEmail(String email);
    User findUserById(String id);
    List<User> findAllByIdIn(List<String> list);
    List<User> findAllByIdInOrderById(List<String> list);
}
