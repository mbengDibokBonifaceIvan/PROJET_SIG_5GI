package com.example.SIG.Controller;

import com.example.SIG.Model.pv;
import com.example.SIG.Repository.PvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pvs")
@CrossOrigin("http://localhost:3000") // Pour connecter le backend au frontend
public class PvController {

    @Autowired
    private PvRepository pvRepository;

    @GetMapping("/all")
    public List<pv> getAllpv() {
        return pvRepository.findAll();
    }

    @GetMapping("/{id}")
    public pv getPvById(@PathVariable Long id) {
        return pvRepository.findById(id).orElse(null);
    }

    @PostMapping("/addPv")
    public pv createpv(@RequestBody pv pv) {
        return pvRepository.save(pv);
    }

    @PutMapping("/editPv/{id}")
    public pv updatepv(@PathVariable Long id, @RequestBody pv pv) {
        if (pvRepository.existsById(id)) {
            pv.setid_Pv(id);
            return pvRepository.save(pv);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deletePv/{id}")
    public void deletepv(@PathVariable Long id) {
        pvRepository.deleteById(id);
    }

    @GetMapping("/totalVotes")
    public int getTotalVotes() {
        return pvRepository.getTotalVotes();
    }

    @GetMapping("/totalVoixByBureauDeVote")
    public List<Object[]> getTotalVoixByBureauDeVote() {
        return pvRepository.getTotalVoixByBureauDeVoteWithNames();
    }

    @GetMapping("/totalVoixByCandidat/{candidatId}")
    public int getTotalVoixByCandidat(@PathVariable Long candidatId) {
        return pvRepository.getTotalVoixByCandidat(candidatId);
    }

    @GetMapping("/annee/{id}")
    public int getAnneeElectionById(@PathVariable Long id) {
        pv pv = pvRepository.findById(id).orElse(null);
        if (pv != null) {
            return pv.getAnnee_election();
        } else {
            return -1; // Ou une autre valeur par défaut pour indiquer qu'aucun résultat n'a été trouvé
                       // pour l'ID donné
        }
    }

    @GetMapping("/totalVoixByCandidatWithNames")
    public List<Object[]> getTotalVoixByCandidatWithNames() {
        return pvRepository.getTotalVoixByCandidatWithNames();
    }

    @GetMapping("/totalVoixByCandidatAndBureauDeVote/{bureauVoteId}")
    public List<Map<String, Object>> getTotalVoixByCandidatAndBureauDeVote(@PathVariable Long bureauVoteId) {
        return pvRepository.getTotalVoixByCandidatAndBureauDeVote(bureauVoteId);
    }

    @GetMapping("/bureau/{idBureauVote}")
    public List<pv> getpvByBureauVoteId(@PathVariable Long idBureauVote) {
        return pvRepository.findAllByBureauVoteId(idBureauVote);
    }

    @GetMapping("/total-votes/{bureauId}")
    public Integer getTotalVotesByBureauId(@PathVariable Long bureauId) {
        return pvRepository.getTotalVotesByBureauId(bureauId);
    }
}