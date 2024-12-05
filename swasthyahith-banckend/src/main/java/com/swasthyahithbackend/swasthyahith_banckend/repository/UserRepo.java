package com.swasthyahithbackend.swasthyahith_banckend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swasthyahithbackend.swasthyahith_banckend.entity.User;

public interface UserRepo extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    
}
