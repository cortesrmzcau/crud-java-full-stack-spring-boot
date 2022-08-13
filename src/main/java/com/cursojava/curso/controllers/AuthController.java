package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UserDao;
import com.cursojava.curso.models.User;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/auth", method = RequestMethod.POST)
    public String login(@RequestBody User user) {
        User userLogin = userDao.getUserEmailPassword(user);
        if (userLogin != null) {
            String tokenJwt = jwtUtil.create(String.valueOf(userLogin.getId_user()), userLogin.getEmail());
            return tokenJwt;
        }
        return "FAIL";
    }
}
