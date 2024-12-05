package com.swasthyahithbackend.swasthyahith_banckend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swasthyahithbackend.swasthyahith_banckend.dto.AuthCredentialRequests;
import com.swasthyahithbackend.swasthyahith_banckend.dto.RegistrationData;
import com.swasthyahithbackend.swasthyahith_banckend.entity.User;
import com.swasthyahithbackend.swasthyahith_banckend.service.AuthenticationService;
import com.swasthyahithbackend.swasthyahith_banckend.utils.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationData registrationData) {
        User user = authenticationService.registUser(registrationData);
        return ResponseEntity.ok(user);
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialRequests authCredentialRequests) {
        try {
            Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authCredentialRequests.getUsername(), authCredentialRequests.getPassword())
            );

            User userDetails = (User) authenticate.getPrincipal();

            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
                    .body("Login successful. JWT token generated.");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
