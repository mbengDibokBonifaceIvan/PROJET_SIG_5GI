package com.example.SIG.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.SIG.Model.Bureaux_De_Vote;

@Repository
public interface BureauxDeVoteRepository extends JpaRepository<Bureaux_De_Vote, Long> {
    // Vous pouvez ajouter des méthodes personnalisées de requête ici si nécessaire
    Long countAllBy();

    @Query("SELECT b FROM Bureaux_De_Vote b WHERE b.coordonnees.latitude = :latitude AND b.coordonnees.longitude = :longitude")
    Bureaux_De_Vote findByLatitudeAndLongitude(@Param("latitude") double latitude, @Param("longitude") double longitude);}