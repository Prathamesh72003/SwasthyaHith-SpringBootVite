package com.swasthyahithbackend.swasthyahith_banckend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationData {
    private long id;
    private String username;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String authority;
}
