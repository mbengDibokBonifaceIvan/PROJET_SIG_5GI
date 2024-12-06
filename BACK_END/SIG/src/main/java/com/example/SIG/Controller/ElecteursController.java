package com.example.SIG.Controller;

import com.example.SIG.Service.ElecteursService;
import com.example.SIG.Model.Electeurs;
import com.example.SIG.Repository.ElecteursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
@RequestMapping("/electeurs")
public class ElecteursController {

    @Autowired
    private ElecteursRepository electeursRepository;

    @Autowired
    private ElecteursService electeursService;

    @GetMapping("/all")
    public List<Electeurs> getAllElecteurs() {
        return electeursRepository.findAll();
    }

    @GetMapping("/{id}")
    public Electeurs getElecteurById(@PathVariable Long id) {
        return electeursRepository.findById(id).orElse(null);
    }

    @PostMapping("/addElecteur")
    public Electeurs createElecteur(@RequestBody Electeurs electeur) {
        return electeursRepository.save(electeur);
    }

    @PutMapping("/editElecteur/{id}")
    public Electeurs updateElecteur(@PathVariable Long id, @RequestBody Electeurs electeur) {
        if (electeursRepository.existsById(id)) {
            electeur.setId_électeur(id);
            return electeursRepository.save(electeur);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("/deleteElecteur/{id}")
    public void deleteElecteur(@PathVariable Long id) {
        electeursRepository.deleteById(id);
    }

    @GetMapping("/totalElecteursByBureauDeVote")
    public List<Map<String, Long>> getTotalElecteursByBureauDeVote() {
        return electeursService.getTotalElecteursByBureauDeVote();
    }

    @GetMapping("/count")
    public Long countDepartements() {
        return electeursRepository.countAllBy();
    }
}