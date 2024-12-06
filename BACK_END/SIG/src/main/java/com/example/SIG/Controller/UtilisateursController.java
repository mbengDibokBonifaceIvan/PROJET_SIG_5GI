package com.example.SIG.Controller;

import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin("http://localhost:3000") //Pour connecter le backend au frontend
public class UtilisateursController {

    @Autowired
    private UtilisateursRepository utilisateursRepository;

    @GetMapping("/all")
    public List<Utilisateurs> getAllUtilisateurs() {
        return utilisateursRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateurs getUtilisateursById(@PathVariable Long id) {
        return utilisateursRepository.findById(id).orElse(null);
    }

    @PostMapping("/addUser")
    public Utilisateurs createUtilisateurs(@RequestBody Utilisateurs utilisateurs) {
        return utilisateursRepository.save(utilisateurs);
    }

    @PutMapping("/editUser/{id}")
    public Utilisateurs updateUtilisateurs(@PathVariable Long id, @RequestBody Utilisateurs utilisateurs) {
        if (utilisateursRepository.existsById(id)) {
            utilisateurs.setId_utilisateur(id);
            return utilisateursRepository.save(utilisateurs);
        } else {
            return null; // Gérer le cas où l'entité n'existe pas
        }
    }

    @DeleteMapping("deleteUser/{id}")
    public void deleteUtilisateurs(@PathVariable Long id) {
        utilisateursRepository.deleteById(id);
    }

    @GetMapping("/nombreScrutateurs")
    public int getNombreScrutateurs() {
        return utilisateursRepository.countByRole("Scrutateur");
    }

    @GetMapping("/nombreSuperAdministrateur")
    public int getNombreSuperAdministrateur() {
        return utilisateursRepository.countByRole("SuperAdmin");
    }



}