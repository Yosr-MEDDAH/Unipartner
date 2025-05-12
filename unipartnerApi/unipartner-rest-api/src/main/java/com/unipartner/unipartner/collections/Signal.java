package com.unipartner.unipartner.collections;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
@Document(collection = "signals")
public class Signal {
    @Id
    private String id;

    private String typeSignal;
    private Date reportedAt;
    @DBRef
    private User reportedBy;
}
