package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.repository.BondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BondService {

    @Autowired
    BondRepository bondRepository;

    @Autowired
    public BondService(BondRepository bondRepository) {
        this.bondRepository = bondRepository;
    }

    public Bond addBond(Bond bond) {
        return bondRepository.save(bond);
    }

    public Bond getBondById(Integer bondId) {
        Optional<Bond> bond = bondRepository.findById(bondId);
        return bond.orElse(null);
    }

    public List<Bond> getAllBonds() {
        return bondRepository.findAll();
    }

    public boolean deleteBondById(Integer bondId) {
        boolean deleted = false;

        Optional<Bond> bond = bondRepository.findById(bondId);
        if (bond.isPresent()) {
            bondRepository.delete(bond.get());
            deleted = true;
        }

        return deleted;
    }
}
