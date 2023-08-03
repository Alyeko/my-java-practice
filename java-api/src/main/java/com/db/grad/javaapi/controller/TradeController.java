package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class TradeController {

    @Autowired
    TradeService tradeService;

    @Autowired
    TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @GetMapping("/trades")
    public List<Trade> getAllTrades() {
        return tradeService.getAllTrades();
    }

    @GetMapping("/trades/{id}")
    public ResponseEntity<Trade> getTrade(@PathVariable(value = "id") Integer tradeId) {
        Trade trade = tradeService.getTradeById(tradeId);
        return ResponseEntity.ok().body(trade);
    }

    @PostMapping("/trades")
    public Trade createTrade(@Valid @RequestBody Trade trade) {
        return tradeService.addTrade(trade);
    }

    @DeleteMapping("/trades/{id}")
    public boolean deleteTrade(@PathVariable(value = "id") Integer tradeId) {
        return tradeService.deleteTradeById(tradeId);
    }
}
