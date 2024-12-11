package com.example.SIG.Service;

import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateursService {

    @Autowired
    private UtilisateursRepository utilisateursRepository;

    public Utilisateurs verifyUser(Utilisateurs utilisateurs) {
        return utilisateursRepository.findByNomUtilisateurAndMotDePasse(
                utilisateurs.getNomUtilisateur(),
                utilisateurs.getMotDePasse()
        );
    }
}