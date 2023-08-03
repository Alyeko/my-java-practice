package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.BondRepository;
import com.db.grad.javaapi.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TradeService {
    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public Trade addTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

    public Trade getTradeById(Integer tradeId) {
        Optional<Trade> trade = tradeRepository.findById(tradeId);
        return trade.orElse(null);
    }

    public List<Trade> getAllTrades() {
        return this.tradeRepository.findAll();
    }

    public boolean deleteTradeById(Integer tradeId) {
        boolean deleted = false;

        Optional<Trade> trade = tradeRepository.findById(tradeId);
        if (trade.isPresent()) {
            tradeRepository.delete(trade.get());
            deleted = true;
        }

        return deleted;
    }

}
