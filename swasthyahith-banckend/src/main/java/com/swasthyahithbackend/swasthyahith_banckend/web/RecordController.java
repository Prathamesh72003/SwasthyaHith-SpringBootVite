package com.swasthyahithbackend.swasthyahith_banckend.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swasthyahithbackend.swasthyahith_banckend.entity.MedicalRecords;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.service.RecordService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/records")
public class RecordController {

    @Autowired
    private RecordService recordService;
    
    @PostMapping("")
    public ResponseEntity<?> createRecord(@AuthenticationPrincipal User user) {
        
        MedicalRecords newRecord = recordService.save(user);

        return ResponseEntity.ok(newRecord);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllRecords(@AuthenticationPrincipal User user) {

        Set<MedicalRecords> records = recordService.getAllRecords(user);

        return ResponseEntity.ok(records);
    }

    @GetMapping("{recordId}")
    public ResponseEntity<?> getSpecificRecord(@AuthenticationPrincipal User user, @PathVariable Long recordId) {
       
        Optional<MedicalRecords> recordOpt = recordService.getSpecificMedicalRecord(recordId);
       
        return ResponseEntity.ok(recordOpt.orElse(new MedicalRecords()));
    }
    

}
