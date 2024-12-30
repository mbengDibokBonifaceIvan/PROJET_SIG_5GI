package com.example.SIG.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Entity
@Table(name = "Utilisateurs")
public class Utilisateurs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_utilisateur;

    @Column(name = "nom_utilisateur") // Make sure this matches the column name in the database
    private String nomUtilisateur;

    @Getter
    @Column(name = "mot_de_passe") // Again, ensure this matches the column name in the database
    private String motDePasse;
    @Enumerated(EnumType.STRING)
    private Role role; // Utilisation de l'énum  scrutateur, administrateur, etc.


    @ManyToOne
    @JoinColumn(name = "id_bureau_vote")
    private Bureaux_De_Vote bureauVote;


    public Utilisateurs() {
    }

    public Utilisateurs(Long id_utilisateur, String nomUtilisateur, String motDePasse, String role) {
        this.id_utilisateur = id_utilisateur;
        this.nomUtilisateur = nomUtilisateur;
        this.motDePasse = motDePasse;
        this.role = Role.valueOf(role);
    }

    public Utilisateurs(Long id_utilisateur, String nomUtilisateur, String motDePasse, String role, Bureaux_De_Vote bureauVote) {
        this.id_utilisateur = id_utilisateur;
        this.nomUtilisateur = nomUtilisateur;
        this.motDePasse = motDePasse;
        this.role = Role.valueOf(role);
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
        return nomUtilisateur;
    }

    public void setNom_utilisateur(String nom_utilisateur) {
        this.nomUtilisateur = nom_utilisateur;
    }

    public void setMotDePasse(String mot_de_passe) {
        this.motDePasse = mot_de_passe;
    }

    public String getRole() {
        return String.valueOf(role);
    }

    public void setRole(String role) {
        this.role = Role.valueOf(role);
    }

    public Bureaux_De_Vote getBureauVote() {
        return bureauVote;
    }

    public void setBureauVote(Bureaux_De_Vote bureauVote) {
        this.bureauVote = bureauVote;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public String getMotDePasse() {
        return motDePasse;
    }
}