package com.swasthyahithbackend.swasthyahith_banckend.service;

import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.repository.UserRepo;
import com.swasthyahithbackend.swasthyahith_banckend.utils.CustomPasswordEncoder;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> useropt = userRepo.findByUsername(username);

        return useropt.orElseThrow(() -> new UsernameNotFoundException("Invalid credintials"));
    }
    
}
