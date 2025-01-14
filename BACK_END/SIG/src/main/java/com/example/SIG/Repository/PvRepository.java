package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.pv;

import java.util.List;
import java.util.Map;

@Repository
public interface PvRepository extends JpaRepository<pv, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    @Query("SELECT SUM(r.nombre_voix) FROM pv r")
    int getTotalVotes();

    @Query("SELECT r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau, SUM(r.nombre_voix) FROM pv r GROUP BY r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau")
    List<Object[]> getTotalVoixByBureauDeVoteWithNames();

    @Query("SELECT SUM(r.nombre_voix) FROM pv r WHERE r.candidat.id_candidat = :candidatId")
    int getTotalVoixByCandidat(@Param("candidatId") Long candidatId);

    @Query("SELECT r.candidat.id_candidat, r.candidat.nom_candidat, SUM(r.nombre_voix) AS total_voix FROM pv r GROUP BY r.candidat.id_candidat, r.candidat.nom_candidat")
    List<Object[]> getTotalVoixByCandidatWithNames();

    @Query("SELECT new map(c.nom_candidat as nomCandidat, SUM(r.nombre_voix) as totalVoix) FROM pv r JOIN r.candidat c WHERE r.bureauVote.id_bureau_vote = :bureauVoteId GROUP BY c.nom_candidat")
    List<Map<String, Object>> getTotalVoixByCandidatAndBureauDeVote(Long bureauVoteId);

    /*
     * @Query("SELECT r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau, SUM(r.nombre_voix) FROM pv r GROUP BY r.bureauVote.id_bureau_vote, r.bureauVote.nom_bureau"
     * )
     * List<Object[]> getTotalVoixByBureauDeVoteWithNames();
     */

    @Query("SELECT r FROM pv r WHERE r.bureauVote.id_bureau_vote = :idBureauVote")
    List<pv> findAllByBureauVoteId(@Param("idBureauVote") Long idBureauVote);

    @Query("SELECT SUM(r.nombre_voix) FROM pv r WHERE r.bureauVote.id_bureau_vote = :bureauId")
    Integer getTotalVotesByBureauId(@Param("bureauId") Long bureauId);

}