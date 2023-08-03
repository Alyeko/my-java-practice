package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondRepository;
import com.db.grad.javaapi.repository.TradeRepository;
import com.db.grad.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

   @Autowired
   private TradeRepository tradeRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public boolean deleteUserById(Integer userId) {
        boolean deleted = false;

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            deleted = true;
        }

        return deleted;
    }

    public Set<Book> getBookForUser(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return userRepository.findBooksByUserId(userId);
        } else {
            return null;
        }
    }

    public Set<Trade> getTradesForUser(Integer userId) {
        Set<Book> booksForUser = getBookForUser(userId);
        List<Trade> allTrades = tradeRepository.findAll();
        Set<Trade> tradesForUser = new HashSet<>();
        for (Trade trade : allTrades) {
            if (booksForUser.contains(trade.getBook())) {
                tradesForUser.add(trade);
            }
        }

        return tradesForUser;
    }

    public Set<Bond> getBondsForUser(Integer userId) {
        Set<Trade> tradesForUser = getTradesForUser(userId);
        Set<Bond> bondsForUser = new HashSet<>();

        for (Trade t : tradesForUser) {
            bondsForUser.add(t.getBond());
        }

        return bondsForUser;
    }
}
