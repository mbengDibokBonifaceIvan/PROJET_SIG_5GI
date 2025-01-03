package com.example.SIG.Controller;

import com.example.SIG.Model.Resultats;
import com.example.SIG.Repository.ResultatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resultats")
@CrossOrigin("http://localhost:3000") // Pour connecter le backend au frontend
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

    @GetMapping("/annee/{id}")
    public int getAnneeElectionById(@PathVariable Long id) {
        Resultats resultats = resultatsRepository.findById(id).orElse(null);
        if (resultats != null) {
            return resultats.getAnnee_election();
        } else {
            return -1; // Ou une autre valeur par défaut pour indiquer qu'aucun résultat n'a été trouvé
                       // pour l'ID donné
        }
    }

    @GetMapping("/totalVoixByCandidatWithNames")
    public List<Object[]> getTotalVoixByCandidatWithNames() {
        return resultatsRepository.getTotalVoixByCandidatWithNames();
    }

    @GetMapping("/totalVoixByCandidatAndBureauDeVote/{bureauVoteId}")
    public List<Map<String, Object>> getTotalVoixByCandidatAndBureauDeVote(@PathVariable Long bureauVoteId) {
        return resultatsRepository.getTotalVoixByCandidatAndBureauDeVote(bureauVoteId);
    }

    @GetMapping("/bureau/{idBureauVote}")
    public List<Resultats> getResultatsByBureauVoteId(@PathVariable Long idBureauVote) {
        return resultatsRepository.findAllByBureauVoteId(idBureauVote);
    }

    @GetMapping("/total-votes/{bureauId}")
    public Integer getTotalVotesByBureauId(@PathVariable Long bureauId) {
        return resultatsRepository.getTotalVotesByBureauId(bureauId);
    }
}