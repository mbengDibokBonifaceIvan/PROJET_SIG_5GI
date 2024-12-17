package com.example.SIG.Controller;

import com.example.SIG.Model.Departements;
import com.example.SIG.Repository.DepartementsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/departements")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class DepartementsController {

    @Autowired
    private DepartementsRepository departementsRepository;

    @GetMapping("/all")
    public List<Departements> getAllDepartements() {
        return departementsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Departements getDepartementById(@PathVariable Long id) {
        return departementsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addDepartement")
    public Departements createDepartement(@RequestBody Departements departement) {
        return departementsRepository.save(departement);
    }

    @PutMapping("/editDepartement/{id}")
    public Departements updateDepartement(@PathVariable Long id, @RequestBody Departements departement) {
        if (departementsRepository.existsById(id)) {
            departement.setId_département(id);
            return departementsRepository.save(departement);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteDepartement/{id}")
    public void deleteDepartement(@PathVariable Long id) {
        departementsRepository.deleteById(id);
    }

    @GetMapping("/count")
    public Long countDepartements() {
        return departementsRepository.countAllBy();
    }
}