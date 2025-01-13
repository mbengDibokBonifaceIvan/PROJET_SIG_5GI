package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.SIG.Model.Role;
import com.example.SIG.Model.Utilisateurs;

import java.util.List;

@Repository
public interface UtilisateursRepository extends JpaRepository<Utilisateurs, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire

    @Query("SELECT COUNT(u) FROM Utilisateurs u WHERE u.role = :role")
    int countByRole(@Param("role") Role role);
    
    Utilisateurs findByNomUtilisateurAndMotDePasse(String nom_utilisateur, String mot_de_passe);

    List<Utilisateurs> findByRole(Role role);
    Utilisateurs findByNomUtilisateurAndMotDePasseAndRole(String nomUtilisateur, String motDePasse, Role role);
}
