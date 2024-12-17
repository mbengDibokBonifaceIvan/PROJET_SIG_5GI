package com.example.SIG.Model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Electeurs")
public class Electeurs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_électeur;

    private String nom;

    private String prénom;

    private Date date_naissance;

    private String adresse;

    private String numéro_électeur;

    @ManyToOne
    @JoinColumn(name = "bureau_vote_id")
    private Bureaux_De_Vote bureauVote;

    private Date date_inscription;
    // Constructors and Getters/Setters

    public Electeurs() {
    }

    public Electeurs(Long id_électeur, String nom, String prénom, Date date_naissance, String adresse, String numéro_électeur, Bureaux_De_Vote bureauVote, Date date_inscription) {
        this.id_électeur = id_électeur;
        this.nom = nom;
        this.prénom = prénom;
        this.date_naissance = date_naissance;
        this.adresse = adresse;
        this.numéro_électeur = numéro_électeur;
        this.bureauVote = bureauVote;
        this.date_inscription = date_inscription;
    }


    public Long getId_électeur() {
        return id_électeur;
    }

    public void setId_électeur(Long id_électeur) {
        this.id_électeur = id_électeur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrénom() {
        return prénom;
    }

    public void setPrénom(String prénom) {
        this.prénom = prénom;
    }

    public Date getDate_naissance() {
        return date_naissance;
    }

    public void setDate_naissance(Date date_naissance) {
        this.date_naissance = date_naissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNuméro_électeur() {
        return numéro_électeur;
    }

    public void setNuméro_électeur(String numéro_électeur) {
        this.numéro_électeur = numéro_électeur;
    }

    public Bureaux_De_Vote getBureauVote() {
        return bureauVote;
    }

    public void setBureauVote(Bureaux_De_Vote bureauVote) {
        this.bureauVote = bureauVote;
    }

    public Date getDate_inscription() {
        return date_inscription;
    }

    public void setDate_inscription(Date date_inscription) {
        this.date_inscription = date_inscription;
    }
}