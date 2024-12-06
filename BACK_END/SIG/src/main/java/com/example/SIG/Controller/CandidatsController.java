package com.example.SIG.Controller;

import com.example.SIG.Model.Candidats;
import com.example.SIG.Repository.CandidatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/candidats")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class CandidatsController {

    @Autowired
    private CandidatsRepository candidatsRepository;

    @GetMapping("/all")
    public List<Candidats> getAllCandidats() {
        return candidatsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Candidats getCandidatById(@PathVariable Long id) {
        return candidatsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addCandidat")
    public Candidats createCandidat(@RequestBody Candidats candidat) {
        return candidatsRepository.save(candidat);
    }

    @PutMapping("/editCandidat/{id}")
    public Candidats updateCandidat(@PathVariable Long id, @RequestBody Candidats candidat) {
        if (candidatsRepository.existsById(id)) {
            candidat.setId_candidat(id);
            return candidatsRepository.save(candidat);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteCandidat/{id}")
    public void deleteCandidat(@PathVariable Long id) {
        candidatsRepository.deleteById(id);
    }

    @GetMapping("/count")
    public Long countAllCandidats() {
        return candidatsRepository.countAllBy();
    }
}
