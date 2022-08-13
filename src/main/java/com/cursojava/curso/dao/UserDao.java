package com.cursojava.curso.dao;

import com.cursojava.curso.models.User;

import java.util.List;

public interface UserDao {
    List<User> getUsers();

    void delete(int id_user);
    
    void registerUser(User user);

    User getUserEmailPassword(User user);
}
