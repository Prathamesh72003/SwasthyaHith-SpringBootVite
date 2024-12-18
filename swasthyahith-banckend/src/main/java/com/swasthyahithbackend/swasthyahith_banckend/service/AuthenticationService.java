package com.swasthyahithbackend.swasthyahith_banckend.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swasthyahithbackend.swasthyahith_banckend.dto.RegistrationData;
import com.swasthyahithbackend.swasthyahith_banckend.entity.Authority;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.repository.AuthorityRepo;
import com.swasthyahithbackend.swasthyahith_banckend.repository.UserRepo;
import com.swasthyahithbackend.swasthyahith_banckend.utils.CustomPasswordEncoder;

@Service
public class AuthenticationService {
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthorityRepo authorityRepo;

    @Autowired
    CustomPasswordEncoder customPasswordEncoder;

    @Transactional
    public User registUser(RegistrationData regdata){

        if (userRepo.existsByUsername(regdata.getUsername())) {
            throw new IllegalArgumentException("Username already exists.");
        }
        if (userRepo.existsByEmail(regdata.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }
        

        User user = new User();
        Authority authority = new Authority();

        user.setName(regdata.getName());
        user.setUsername(regdata.getUsername());
        user.setRegistrationNumber(regdata.getRegistrationNumber());
        user.setEmail(regdata.getEmail());
        user.setPassword(customPasswordEncoder.getPasswordEncoder().encode(regdata.getPassword()));
        user.setPhone(regdata.getPhone());
        user.setRegisterdAt(Date.from(java.time.Instant.now()));

        User savedUser = userRepo.save(user);

        authority.setAuthority(regdata.getAuthority());
        authority.setUser(user);
        authorityRepo.save(authority);
        
        return savedUser;
    }

}
