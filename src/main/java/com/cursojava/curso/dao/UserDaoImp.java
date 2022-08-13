package com.cursojava.curso.dao;

import com.cursojava.curso.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManagerK;

    @Override
    public List<User> getUsers() {
        String query = "FROM User";
        return entityManagerK.createQuery(query).getResultList();
    }

    @Override
    public void delete(int id_user) {
        User user = entityManagerK.find(User.class,id_user);
        entityManagerK.remove(user);
    }

    @Override
    public void registerUser(User user) {
        entityManagerK.merge(user);
    }

    @Override
    public User getUserEmailPassword(User user) {
        String query = "FROM User WHERE email = :email";
        List<User> list = entityManagerK.createQuery(query)
            .setParameter("email", user.getEmail())
            .getResultList();

        if (list.isEmpty()) {
            return null;
        }

        String passwordHashed = list.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, user.getPassword())) {
            return list.get(0);
        }

        return null;
    }

}
