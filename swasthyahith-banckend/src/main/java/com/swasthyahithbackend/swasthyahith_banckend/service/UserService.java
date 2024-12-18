package com.swasthyahithbackend.swasthyahith_banckend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.swasthyahithbackend.swasthyahith_banckend.dto.UserDto;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public Optional<UserDto> getUserData(long id){
        if (!userRepo.existsById(id)) {
            throw new IllegalArgumentException("User does not exist.");
        }

        User user = userRepo.findById(id).get();
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setRegistrationNumber(user.getRegistrationNumber());
        
        return Optional.ofNullable(userDto);
    }

}
