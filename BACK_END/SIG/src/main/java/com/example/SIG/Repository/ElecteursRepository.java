package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Electeurs;

import java.util.List;
import java.util.Map;

@Repository
public interface ElecteursRepository extends JpaRepository<Electeurs, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
    @Query("SELECT e.bureauVote.nom_bureau, COUNT(e) FROM Electeurs e WHERE e.bureauVote.nom_bureau IS NOT NULL GROUP BY e.bureauVote.nom_bureau")
    List<Object[]> countElecteursByBureauDeVote();

    @Query("SELECT e.bureauVote.nom_bureau, COUNT(e) FROM Electeurs e WHERE e.bureauVote.nom_bureau IS NOT NULL GROUP BY e.bureauVote.nom_bureau")
    List<Map<String, Long>> countElecteursByBureauDeVoteMap();


}