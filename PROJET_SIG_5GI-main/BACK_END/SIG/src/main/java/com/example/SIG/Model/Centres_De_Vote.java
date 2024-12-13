package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Centres_De_Vote")
public class Centres_De_Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_centre_vote;

    private String nom_centre;

    @ManyToOne
    @JoinColumn(name = "arrondissement_id")
    private Arrondissements arrondissement;

    public Centres_De_Vote() {
    }

    public Centres_De_Vote(Long id_centre_vote, String nom_centre, Arrondissements arrondissement) {
        this.id_centre_vote = id_centre_vote;
        this.nom_centre = nom_centre;
        this.arrondissement = arrondissement;
    }

    // Getters and Setters

    public Long getId_centre_vote() {
        return id_centre_vote;
    }

    public void setId_centre_vote(Long id_centre_vote) {
        this.id_centre_vote = id_centre_vote;
    }

    public String getNom_centre() {
        return nom_centre;
    }

    public void setNom_centre(String nom_centre) {
        this.nom_centre = nom_centre;
    }

    public Arrondissements getArrondissement() {
        return arrondissement;
    }

    public void setArrondissement(Arrondissements arrondissement) {
        this.arrondissement = arrondissement;
    }
}