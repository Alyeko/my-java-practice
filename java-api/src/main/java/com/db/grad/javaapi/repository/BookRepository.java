package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    // Add custom queries if needed

    // Custom method to find users associated with a book
    @Query("SELECT b.users FROM Book b WHERE b.bookId = :bookId")
    Set<User> findUsersByBookId(Integer bookId);
}