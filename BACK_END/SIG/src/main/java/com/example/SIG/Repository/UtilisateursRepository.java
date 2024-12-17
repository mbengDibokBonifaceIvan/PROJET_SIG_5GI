package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Utilisateurs;

@Repository
public interface UtilisateursRepository extends JpaRepository<Utilisateurs, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    int countByRole(String role);
    Utilisateurs findByNomUtilisateurAndMotDePasse(String nom_utilisateur, String mot_de_passe);
}
