package com.swasthyahithbackend.swasthyahith_banckend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swasthyahithbackend.swasthyahith_banckend.entity.Authority;

public interface AuthorityRepo extends JpaRepository<Authority, Long> {
    
}
