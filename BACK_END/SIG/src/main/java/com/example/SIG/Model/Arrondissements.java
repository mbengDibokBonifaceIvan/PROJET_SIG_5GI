package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Arrondissements")
public class Arrondissements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_arrondissement;

    private String nom_arrondissement;

    @ManyToOne
    @JoinColumn(name = "id_département")
    private Departements département;

    public Arrondissements() {
    }

    public Arrondissements(Long id_arrondissement, String nom_arrondissement, Departements département) {
        this.id_arrondissement = id_arrondissement;
        this.nom_arrondissement = nom_arrondissement;
        this.département = département;
    }

    // Getters and Setters

    public Long getId_arrondissement() {
        return id_arrondissement;
    }

    public void setId_arrondissement(Long id_arrondissement) {
        this.id_arrondissement = id_arrondissement;
    }

    public String getNom_arrondissement() {
        return nom_arrondissement;
    }

    public void setNom_arrondissement(String nom_arrondissement) {
        this.nom_arrondissement = nom_arrondissement;
    }

    public Departements getDépartement() {
        return département;
    }

    public void setDépartement(Departements département) {
        this.département = département;
    }
}
