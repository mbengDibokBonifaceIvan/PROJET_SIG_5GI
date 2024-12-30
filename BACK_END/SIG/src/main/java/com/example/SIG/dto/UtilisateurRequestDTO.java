package com.example.SIG.dto;

import com.example.SIG.Model.Bureaux_De_Vote;
import com.example.SIG.Model.Role;
import com.example.SIG.Model.Utilisateurs;
import lombok.Data;


@Data
public class UtilisateurRequestDTO {
    private String nomUtilisateur;
    private String motDePasse;
    private String role; // Utilisez une chaîne pour le rôle
    private Long id_bureau_vote;

    // Getters and setters

    // Method to convert DTO to Utilisateurs entity
    public Utilisateurs toEntity() {
        Utilisateurs utilisateur = new Utilisateurs();
        utilisateur.setNomUtilisateur(this.nomUtilisateur);
        utilisateur.setMotDePasse(this.motDePasse);
        utilisateur.setRole(String.valueOf(Role.valueOf(this.role))); // Assurez-vous que cette conversion est correcte

        if (this.id_bureau_vote != null) {
            Bureaux_De_Vote bureauVote = new Bureaux_De_Vote();
            bureauVote.setId_bureau_vote(this.id_bureau_vote);
            utilisateur.setBureauVote(bureauVote);
        }

        return utilisateur;
    }
}