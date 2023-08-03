package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity <User> getUser(@PathVariable(value = "id") Integer userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }

    @DeleteMapping("/users/{id}")
    public boolean deleteUser(@PathVariable(value = "id") Integer userId) {
        return userService.deleteUserById(userId);
    }

    @GetMapping("/users/{id}/books")
    public Set<Book> getBooksForUser(@PathVariable(value = "id") Integer userId) {
        return userService.getBookForUser(userId);
    }

    @GetMapping("/users/{id}/trades")
    public Set<Trade> getTradesForUser(@PathVariable(value = "id") Integer userId) {
        return userService.getTradesForUser(userId);
    }
    @GetMapping("/users/{id}/bonds")
    public Set<Bond> getBondsForUser(@PathVariable(value = "id") Integer userId) {
        return userService.getBondsForUser(userId);
    }
}
