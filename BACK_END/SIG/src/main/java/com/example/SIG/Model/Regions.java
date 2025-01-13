package com.example.SIG.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Regions")
public class Regions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_région;

    private String nom_région;

    public Regions() {
    }

    public Regions(Long id_région, String nom_région) {
        this.id_région = id_région;
        this.nom_région = nom_région;
    }

    // Getters and Setters

    public Long getId_région() {
        return id_région;
    }

    public void setId_région(Long id_région) {
        this.id_région = id_région;
    }

    public String getNom_région() {
        return nom_région;
    }

    public void setNom_région(String nom_région) {
        this.nom_région = nom_région;
    }
}