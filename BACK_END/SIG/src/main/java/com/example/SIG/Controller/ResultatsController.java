package com.example.SIG.Controller;

import com.example.SIG.Model.Resultats;
import com.example.SIG.Repository.ResultatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/resultats")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class ResultatsController {

    @Autowired
    private ResultatsRepository resultatsRepository;

    @GetMapping("/all")
    public List<Resultats> getAllResultats() {
        return resultatsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Resultats getResultatById(@PathVariable Long id) {
        return resultatsRepository.findById(id).orElse(null);
    }

    @PostMapping("/addResultat")
    public Resultats createResultat(@RequestBody Resultats resultat) {
        return resultatsRepository.save(resultat);
    }

    @PutMapping("/editResultat/{id}")
    public Resultats updateResultat(@PathVariable Long id, @RequestBody Resultats resultat) {
        if (resultatsRepository.existsById(id)) {
            resultat.setId_résultat(id);
            return resultatsRepository.save(resultat);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteResultat/{id}")
    public void deleteResultat(@PathVariable Long id) {
        resultatsRepository.deleteById(id);
    }

    @GetMapping("/totalVotes")
    public int getTotalVotes() {
        return resultatsRepository.getTotalVotes();
    }

    @GetMapping("/totalVoixByBureauDeVote")
    public List<Object[]> getTotalVoixByBureauDeVote() {
        return resultatsRepository.getTotalVoixByBureauDeVoteWithNames();
    }


    @GetMapping("/totalVoixByCandidat/{candidatId}")
    public int getTotalVoixByCandidat(@PathVariable Long candidatId) {
        return resultatsRepository.getTotalVoixByCandidat(candidatId);
    }
}