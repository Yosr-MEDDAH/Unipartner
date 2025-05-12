package com.unipartner.unipartner.dto;

import com.unipartner.unipartner.collections.User;
import lombok.Data;

import java.util.Date;

@Data
public class SignalDTO {
    private String id;
    private String typeSignal;
    private Date reportedAt;
    private User reportedBy;
}