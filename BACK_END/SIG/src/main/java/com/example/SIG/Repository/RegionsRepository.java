package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Regions;

@Repository
public interface RegionsRepository extends JpaRepository<Regions, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();
}