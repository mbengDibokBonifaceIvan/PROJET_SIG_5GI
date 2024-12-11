package com.example.SIG.Controller;

import com.example.SIG.Model.Bureaux_De_Vote;
import com.example.SIG.Model.Coordonnees;
import com.example.SIG.Repository.BureauxDeVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/bureaux-de-vote")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class BureauxDeVoteController {

    @Autowired
    private BureauxDeVoteRepository bureauxDeVoteRepository;

    @GetMapping("/all")
    public List<Bureaux_De_Vote> getAllBureauxDeVote() {
        return bureauxDeVoteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Bureaux_De_Vote getBureauDeVoteById(@PathVariable Long id) {
        return bureauxDeVoteRepository.findById(id).orElse(null);
    }

    @PostMapping("/addBureauDeVote")
    public Bureaux_De_Vote createBureauDeVote(@RequestBody Bureaux_De_Vote bureauDeVote) {
        return bureauxDeVoteRepository.save(bureauDeVote);
    }

    @PutMapping("/editBureauDeVote/{id}")
    public Bureaux_De_Vote updateBureauDeVote(@PathVariable Long id, @RequestBody Bureaux_De_Vote bureauDeVote) {
        if (bureauxDeVoteRepository.existsById(id)) {
            bureauDeVote.setId_bureau_vote(id);
            return bureauxDeVoteRepository.save(bureauDeVote);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteBureauDeVote/{id}")
    public void deleteBureauDeVote(@PathVariable Long id) {
        bureauxDeVoteRepository.deleteById(id);
    }

    @GetMapping("/count")
    public Long countAllBureauxDeVote() {
        return bureauxDeVoteRepository.countAllBy();
    }

    @GetMapping("/{id}/coordinates")
    public Coordonnees getBureauDeVoteCoordinates(@PathVariable Long id) {
        Bureaux_De_Vote bureauDeVote = bureauxDeVoteRepository.findById(id).orElse(null);
        if (bureauDeVote != null) {
            return bureauDeVote.getCoordonnees();
        }
        return null;
    }


    @GetMapping("/by-coordinates")
    public Bureaux_De_Vote getBureauDeVoteByCoordinates(@RequestParam double latitude, @RequestParam double longitude) {
        return bureauxDeVoteRepository.findByLatitudeAndLongitude(latitude, longitude);
    }
}