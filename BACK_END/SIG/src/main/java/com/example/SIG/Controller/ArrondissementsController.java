package com.example.SIG.Controller;

import com.example.SIG.Model.Arrondissements;
import com.example.SIG.Repository.ArrondissementsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
@RequestMapping("/arrondissements")
public class ArrondissementsController {

    @Autowired
    private ArrondissementsRepository arrondissementsRepository;

    @GetMapping("/all")
    public List<Arrondissements> getAllArrondissements() {
        return arrondissementsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Arrondissements getArrondissementById(@PathVariable Long id) {
        return arrondissementsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addArrondissement")
    public Arrondissements createArrondissement(@RequestBody Arrondissements arrondissement) {
        return arrondissementsRepository.save(arrondissement);
    }

    @PutMapping("/editArrondissement/{id}")
    public Arrondissements updateArrondissement(@PathVariable Long id, @RequestBody Arrondissements arrondissement) {
        if (arrondissementsRepository.existsById(id)) {
            arrondissement.setId_arrondissement(id);
            return arrondissementsRepository.save(arrondissement);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteArrondissement/{id}")
    public void deleteArrondissement(@PathVariable Long id) {
        arrondissementsRepository.deleteById(id);
    }

    @GetMapping("/count")
    public Long countAllArrondissements() {
        return arrondissementsRepository.countAllBy();
    }
}