package com.example.SIG.Service;

import com.example.SIG.Model.Role;
import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateursService {

    @Autowired
    private UtilisateursRepository utilisateursRepository;

    public Utilisateurs createUtilisateur(Utilisateurs utilisateurs) {
        return utilisateursRepository.save(utilisateurs);
    }

    public Utilisateurs verifyUser1(String nomUtilisateur, String motDePasse ,String role) {
        // Check if the user exists with the given credentials
        Utilisateurs utilisateur = utilisateursRepository.findByNomUtilisateurAndMotDePasseAndRole(
                nomUtilisateur ,
                motDePasse,
                Role.valueOf(role)
        );

        // Return true if the user is found, false otherwise
        //return utilisateur != null;
        return utilisateur; // Will return null if no user is found

    }

}