package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Resultats;

import java.util.List;
import java.util.Map;

@Repository
public interface ResultatsRepository extends JpaRepository<Resultats, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    @Query("SELECT SUM(r.nombre_voix) FROM Resultats r")
    int getTotalVotes();
    @Query("SELECT r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau, SUM(r.nombre_voix) FROM Resultats r GROUP BY r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau")
    List<Object[]> getTotalVoixByBureauDeVoteWithNames();

    @Query("SELECT SUM(r.nombre_voix) FROM Resultats r WHERE r.candidat.id_candidat = :candidatId")
    int getTotalVoixByCandidat(@Param("candidatId") Long candidatId);



    @Query("SELECT r.candidat.id_candidat, r.candidat.nom_candidat, SUM(r.nombre_voix) AS total_voix FROM Resultats r GROUP BY r.candidat.id_candidat, r.candidat.nom_candidat")
    List<Object[]> getTotalVoixByCandidatWithNames();

    @Query("SELECT new map(c.nom_candidat as nomCandidat, SUM(r.nombre_voix) as totalVoix) FROM Resultats r JOIN r.candidat c WHERE r.bureauVote.id_bureau_vote = :bureauVoteId GROUP BY c.nom_candidat")
    List<Map<String, Object>> getTotalVoixByCandidatAndBureauDeVote(Long bureauVoteId);


    /*@Query("SELECT r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau, SUM(r.nombre_voix) FROM Resultats r GROUP BY r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau")
    List<Object[]> getTotalVoixByBureauDeVoteWithNames();*/

    @Query("SELECT r FROM Resultats r WHERE r.bureauVote.id_bureau_vote = :idBureauVote")
    List<Resultats> findAllByBureauVoteId(@Param("idBureauVote") Long idBureauVote);
}