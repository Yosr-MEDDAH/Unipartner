package com.unipartner.unipartner.repositories;

import com.unipartner.unipartner.collections.Signal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignalRepository extends MongoRepository<Signal,String> {

}
