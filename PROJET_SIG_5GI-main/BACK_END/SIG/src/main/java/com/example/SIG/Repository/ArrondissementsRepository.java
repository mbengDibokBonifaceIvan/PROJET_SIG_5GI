package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Arrondissements;

@Repository
public interface ArrondissementsRepository extends JpaRepository<Arrondissements, Long> {

    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
}