package com.example.SIG.Controller;

import com.example.SIG.Model.Centres_De_Vote;
import com.example.SIG.Repository.CentresDeVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/centres-de-vote")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class CentresDeVoteController {

    @Autowired
    private CentresDeVoteRepository centresDeVoteRepository;

    @GetMapping("/all")
    public List<Centres_De_Vote> getAllCentresDeVote() {
        return centresDeVoteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Centres_De_Vote getCentreDeVoteById(@PathVariable Long id) {
        return centresDeVoteRepository.findById(id).orElse(null);
    }

    @PostMapping("/addCentreDeVote")
    public Centres_De_Vote createCentreDeVote(@RequestBody Centres_De_Vote centreDeVote) {
        return centresDeVoteRepository.save(centreDeVote);
    }

    @PutMapping("/editCentreDeVote/{id}")
    public Centres_De_Vote updateCentreDeVote(@PathVariable Long id, @RequestBody Centres_De_Vote centreDeVote) {
        if (centresDeVoteRepository.existsById(id)) {
            centreDeVote.setId_centre_vote(id);
            return centresDeVoteRepository.save(centreDeVote);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteCentreDeVote/{id}")
    public void deleteCentreDeVote(@PathVariable Long id) {
        centresDeVoteRepository.deleteById(id);
    }

    @GetMapping("/count")
    public Long countAllCentresDeVote() {
        return centresDeVoteRepository.countAllBy();
    }

}