package com.example.SIG.dto;

import lombok.Data;

@Data
public class UtilisateurRequestDTO {
    private String nomUtilisateur;
    private String motDePasse;
    private String role; // Utilisez une chaîne pour le rôle
    private Long id_bureau_vote; // Utilisez l'ID au lieu de l'objet complet
}