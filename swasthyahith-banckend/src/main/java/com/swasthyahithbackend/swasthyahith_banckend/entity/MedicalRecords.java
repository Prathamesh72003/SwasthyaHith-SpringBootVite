package com.swasthyahithbackend.swasthyahith_banckend.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MedicalRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String recordDataURL;
    private Date createdAt;
    private Date updatedAt;
    @ManyToOne(optional = false)
    private User user;
    @Column(name = "doctor_id")
    private User doctorId;
    private String diagnosis;

}
