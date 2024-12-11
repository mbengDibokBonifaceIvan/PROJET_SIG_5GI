package com.example.SIG.Service;

import com.example.SIG.Model.Utilisateurs;
import com.example.SIG.Repository.UtilisateursRepository;
import com.example.SIG.dto.LoginRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateursService {

    @Autowired
    private UtilisateursRepository utilisateursRepository;

//    public boolean verifyUser(LoginRequestDTO loginRequestDTO) {
//        // Check if the user exists with the given credentials
//        Utilisateurs utilisateur = utilisateursRepository.findByNomUtilisateurAndMotDePasse(
//                loginRequestDTO.getNomUtilisateur(),
//                loginRequestDTO.getMotDePasse()
//        );
//
//        // Return true if the user is found, false otherwise
//        return utilisateur != null;
//    }

    public boolean verifyUser1(String username, String password) {
        // Check if the user exists with the given credentials
        Utilisateurs utilisateur = utilisateursRepository.findByNomUtilisateurAndMotDePasse(
                username ,
                password
        );

        // Return true if the user is found, false otherwise
        return utilisateur != null;

    }

    public boolean verifyUser(String name, String password) {
        // Check if the user exists with the given credentials
        Utilisateurs utilisateur = utilisateursRepository.findByNomUtilisateurAndMotDePasse(
                name ,
                password
        );

        // Return true if the user is found, false otherwise
        return utilisateur != null;

    }
}