package com.swasthyahithbackend.swasthyahith_banckend.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swasthyahithbackend.swasthyahith_banckend.dto.UserDto;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public ResponseEntity<?> getUserData(@AuthenticationPrincipal User user) {
        Optional<UserDto> useropt = userService.getUserData(user.getId());
        return ResponseEntity.ok(useropt);
    }

}
