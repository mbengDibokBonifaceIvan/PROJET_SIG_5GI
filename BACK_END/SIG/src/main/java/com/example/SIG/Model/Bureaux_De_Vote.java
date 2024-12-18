package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Bureaux_De_Vote")
public class Bureaux_De_Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_bureau_vote;

    private String nom_bureau;

<<<<<<< HEAD
    @Embedded
    private Coordonnees coordonnees;

=======
    private double latitude;

    private double longitude;
>>>>>>> new_diroil
    @ManyToOne
    @JoinColumn(name = "centre_vote_id")
    private Centres_De_Vote centreVote;

<<<<<<< HEAD
    public Bureaux_De_Vote() {
    }

    public Bureaux_De_Vote(Long id_bureau_vote, String nom_bureau, Coordonnees coordonnees, Centres_De_Vote centreVote) {
        this.id_bureau_vote = id_bureau_vote;
        this.nom_bureau = nom_bureau;
        this.coordonnees = coordonnees;
=======
    // @Embedded
    // private Coordonnees coordonnees;

    public Bureaux_De_Vote() {
    }

    public Bureaux_De_Vote(Long id_bureau_vote, String nom_bureau ,double latitude, double longitude /*Coordonnees coordonnees*/, Centres_De_Vote centreVote) {
        this.id_bureau_vote = id_bureau_vote;
        this.nom_bureau = nom_bureau;
        this.latitude = latitude;
        this.longitude = longitude;
        //this.coordonnees = coordonnees;
>>>>>>> new_diroil
        this.centreVote = centreVote;
    }

    // Getters and Setters

    public Long getId_bureau_vote() {
        return id_bureau_vote;
    }

    public void setId_bureau_vote(Long id_bureau_vote) {
        this.id_bureau_vote = id_bureau_vote;
    }

    public String getNom_bureau() {
        return nom_bureau;
    }

    public void setNom_bureau(String nom_bureau) {
        this.nom_bureau = nom_bureau;
    }

<<<<<<< HEAD
    public Coordonnees getCoordonnees() {
        return coordonnees;
    }

    public void setCoordonnees(Coordonnees coordonnees) {
        this.coordonnees = coordonnees;
    }

=======
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    // public Coordonnees getCoordonnees() {
    //return coordonnees;
    //}

    //public void setCoordonnees(Coordonnees coordonnees) {
    //this.coordonnees = coordonnees;
    //}

>>>>>>> new_diroil
    public Centres_De_Vote getCentreVote() {
        return centreVote;
    }

    public void setCentreVote(Centres_De_Vote centreVote) {
        this.centreVote = centreVote;
    }
}