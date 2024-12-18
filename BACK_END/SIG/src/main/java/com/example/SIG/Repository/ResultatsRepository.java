package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Resultats;

import java.util.List;

@Repository
public interface ResultatsRepository extends JpaRepository<Resultats, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    @Query("SELECT SUM(r.nombre_voix) FROM Resultats r")
    int getTotalVotes();
    @Query("SELECT r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau, SUM(r.nombre_voix) FROM Resultats r GROUP BY r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau")
    List<Object[]> getTotalVoixByBureauDeVoteWithNames();

    @Query("SELECT SUM(r.nombre_voix) FROM Resultats r WHERE r.candidat.id_candidat = :candidatId")
    int getTotalVoixByCandidat(@Param("candidatId") Long candidatId);
}