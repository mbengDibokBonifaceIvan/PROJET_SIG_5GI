package com.example.SIG.Controller;

import com.example.SIG.Model.Resultats;
import com.example.SIG.Model.pv;
import com.example.SIG.Repository.ResultatsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;





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


    @PostMapping("/validateAndSave")
public ResponseEntity<?> validateAndSaveResultat(@RequestBody Resultats resultat) {
    try {
        // 1. Récupérer les données du PV
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<pv[]> pvResponse = restTemplate.getForEntity(
            "http://localhost:8080/pvs/all",
                pv[].class
        );

        System.out.println(pvResponse);

        if (!pvResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Impossible de récupérer les données du PV");
        }

        pv[] pvs = pvResponse.getBody();
        
        // 2. Trouver le PV correspondant
        pv matchingPV = Arrays.stream(pvs)
                .filter(pv -> pv.getBureauVote().getId_bureau_vote().equals(resultat.getBureauVote().getId_bureau_vote()) &&
                        pv.getCandidat().getId_candidat().equals(resultat.getCandidat().getId_candidat()))
                .findFirst()
                .orElse(null);

        if (matchingPV == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Aucun PV correspondant trouvé");
        }

        // 3. Valider les résultats
        if (isResultatsValid(resultat, matchingPV)) {
            // Sauvegarder les résultats
            Resultats savedResultat = resultatsRepository.save(resultat);
            
            return ResponseEntity.ok()
                .body(Map.of(
                    "message", "Résultats validés et sauvegardés avec succès",
                    "resultat", savedResultat
                ));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of(
                    "message", "Les résultats ne correspondent pas au PV",
                    "pvData", matchingPV,
                    "submittedData", resultat
                ));
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur lors de la validation: " + e.getMessage());
    }
}

private boolean isResultatsValid(Resultats resultat, pv pv) {
    // Ajoutez ici votre logique de validation
    // Par exemple:
    return Objects.equals(resultat.getNombre_voix(), pv.getNombre_voix()) &&
           Objects.equals(resultat.getBureauVote().getId_bureau_vote(), pv.getBureauVote().getId_bureau_vote()) &&
           Objects.equals(resultat.getCandidat().getId_candidat(), pv.getCandidat().getId_candidat());
}







}