package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.service.BondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class BondController {

    @Autowired
    private BondService bondService;

    @Autowired
    public BondController(BondService bondService) {
        this.bondService = bondService;
    }

    @GetMapping("/bonds")
    public List<Bond> getAllBonds() {
        return bondService.getAllBonds();
    }

    @GetMapping("/bonds/{id}")
    public ResponseEntity<Bond> getBond(@PathVariable(value = "id") Integer bondId) {
        Bond bond = bondService.getBondById(bondId);
        return ResponseEntity.ok().body(bond);
    }

    @PostMapping("/bonds")
    public Bond createBond(@Valid @RequestBody Bond bond) {
        return bondService.addBond(bond);
    }

    @DeleteMapping("/bonds/{id}")
    public boolean deleteBond(@PathVariable(value = "id") Integer bondId) {
        return bondService.deleteBondById(bondId);
    }
}
