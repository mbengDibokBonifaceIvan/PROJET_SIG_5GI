package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Departements;

@Repository
public interface DepartementsRepository extends JpaRepository<Departements, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
}