package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Centres_De_Vote;

@Repository
public interface CentresDeVoteRepository extends JpaRepository<Centres_De_Vote, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
}