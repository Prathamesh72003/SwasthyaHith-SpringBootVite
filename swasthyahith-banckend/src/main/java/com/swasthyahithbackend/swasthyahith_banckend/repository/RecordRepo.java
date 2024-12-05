package com.swasthyahithbackend.swasthyahith_banckend.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swasthyahithbackend.swasthyahith_banckend.entity.MedicalRecords;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;

public interface RecordRepo extends JpaRepository<MedicalRecords, Long> {
    Set<MedicalRecords> findByUser(User user);
}
