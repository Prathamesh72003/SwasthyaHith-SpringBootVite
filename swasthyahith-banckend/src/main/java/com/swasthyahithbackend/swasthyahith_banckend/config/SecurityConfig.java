package com.swasthyahithbackend.swasthyahith_banckend.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.swasthyahithbackend.swasthyahith_banckend.filter.JwtFilter;
import com.swasthyahithbackend.swasthyahith_banckend.service.UserDetailsServiceImpl;
import com.swasthyahithbackend.swasthyahith_banckend.utils.CustomPasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    @Autowired
    private JwtFilter jwtFiler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder.getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http = http.csrf().disable().cors().disable();

        http = http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();

        http = http.exceptionHandling().authenticationEntryPoint((request, response, e) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
        }).and();

        http.authorizeRequests()
        .antMatchers("/api/**").permitAll()
        .anyRequest().authenticated();

        http.addFilterBefore(jwtFiler, UsernamePasswordAuthenticationFilter.class);
    }
    

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
