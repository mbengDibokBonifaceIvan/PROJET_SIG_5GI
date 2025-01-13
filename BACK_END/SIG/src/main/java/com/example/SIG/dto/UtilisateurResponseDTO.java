package com.example.SIG.dto;
import com.example.SIG.Model.Utilisateurs;
import lombok.Data;

@Data
public class UtilisateurResponseDTO {
    private Long id_utilisateur;
    private String nomUtilisateur;
    private String role;
    private Long id_bureau_vote;

    // Getters and setters

    // Constructor to create DTO from Utilisateurs entity
    public static UtilisateurResponseDTO fromEntity(Utilisateurs utilisateur) {
        UtilisateurResponseDTO responseDTO = new UtilisateurResponseDTO();
        responseDTO.setId_utilisateur(utilisateur.getId_utilisateur());
        responseDTO.setNomUtilisateur(utilisateur.getNomUtilisateur());
        responseDTO.setRole(utilisateur.getRole());

        if (utilisateur.getBureauVote() != null) {
            responseDTO.setId_bureau_vote(utilisateur.getBureauVote().getId_bureau_vote());
        }

        return responseDTO;
    }
}