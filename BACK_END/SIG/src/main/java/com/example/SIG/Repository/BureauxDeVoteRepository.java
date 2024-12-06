package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Bureaux_De_Vote;

@Repository
public interface BureauxDeVoteRepository extends JpaRepository<Bureaux_De_Vote, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
}