package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Utilisateurs")
public class Utilisateurs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_utilisateur;

    private String nom_utilisateur;
    private String mot_de_passe;
    private String role; // scrutateur, administrateur, etc.

    @ManyToOne
    @JoinColumn(name = "id_bureau_vote")
    private Bureaux_De_Vote bureauVote;


    public Utilisateurs() {
    }

    public Utilisateurs(Long id_utilisateur, String nom_utilisateur, String mot_de_passe, String role) {
        this.id_utilisateur = id_utilisateur;
        this.nom_utilisateur = nom_utilisateur;
        this.mot_de_passe = mot_de_passe;
        this.role = role;
    }

    public Utilisateurs(Long id_utilisateur, String nom_utilisateur, String mot_de_passe, String role, Bureaux_De_Vote bureauVote) {
        this.id_utilisateur = id_utilisateur;
        this.nom_utilisateur = nom_utilisateur;
        this.mot_de_passe = mot_de_passe;
        this.role = role;
        this.bureauVote = bureauVote;
    }
// Getters and Setters

    public Long getId_utilisateur() {
        return id_utilisateur;
    }

    public void setId_utilisateur(Long id_utilisateur) {
        this.id_utilisateur = id_utilisateur;
    }

    public String getNom_utilisateur() {
        return nom_utilisateur;
    }

    public void setNom_utilisateur(String nom_utilisateur) {
        this.nom_utilisateur = nom_utilisateur;
    }

    public String getMot_de_passe() {
        return mot_de_passe;
    }

    public void setMot_de_passe(String mot_de_passe) {
        this.mot_de_passe = mot_de_passe;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Bureaux_De_Vote getBureauVote() {
        return bureauVote;
    }

    public void setBureauVote(Bureaux_De_Vote bureauVote) {
        this.bureauVote = bureauVote;
    }
}