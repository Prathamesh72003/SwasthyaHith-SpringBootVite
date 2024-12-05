package com.swasthyahithbackend.swasthyahith_banckend.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swasthyahithbackend.swasthyahith_banckend.entity.MedicalRecords;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.repository.RecordRepo;

@Service
public class RecordService {

    @Autowired
    private RecordRepo recordRepo; 
 
    public MedicalRecords save(User user){
        MedicalRecords record = new MedicalRecords();
        record.setUser(user);

        return recordRepo.save(record);
    }

    public Set<MedicalRecords> getAllRecords(User user){
        return recordRepo.findByUser(user);
    }

    public Optional<MedicalRecords> getSpecificMedicalRecord(Long RecordId){
        if (!recordRepo.existsById(RecordId)) {
            throw new IllegalArgumentException("Record does not exist.");
        }

        return recordRepo.findById(RecordId);
        
    }

}
