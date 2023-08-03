package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Add custom queries if needed

    // Custom method to find books associated with a user
    @Query("SELECT u.books FROM User u WHERE u.userId = :userId")
    Set<Book> findBooksByUserId(Integer userId);
}
