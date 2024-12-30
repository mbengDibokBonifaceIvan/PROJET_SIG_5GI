package com.example.SIG.Repository;

import com.example.SIG.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Utilisateurs;

@Repository
public interface UtilisateursRepository extends JpaRepository<Utilisateurs, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    int countByRole(String role);

    Utilisateurs findByNomUtilisateurAndMotDePasseAndRole(String nomUtilisateur, String motDePasse, Role role);
}
